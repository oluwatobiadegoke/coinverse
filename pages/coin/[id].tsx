import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";

import { Coin, InfoProps } from "../../interfaces";
import { ExtendedCoin } from "../";
import Layout from "../../components/Layout";
import Chart from "../../components/CoinPage/Chart";
import TopInfo from "../../components/CoinPage/TopInfo";
import { TopInfoProps } from "../../components/CoinPage/TopInfo";

type Props = {
  info: InfoProps;
  infoFromOverview: ExtendedCoin;
};

const Coin = ({ info, infoFromOverview }: Props) => {
  const {
    name,
    symbol,
    founded,
    descriptions: { introduction, technology },
    whitepaper: { abstract },
    website,
    video,
    socials: { twitter, facebook, telegram, reddit, vimeo, discord, medium },
  } = info;
  const { rank, price, market_cap } = infoFromOverview;

  const data: TopInfoProps = {
    name,
    symbol,
    rank,
    price,
    market_cap,
  };

  return (
    <Layout title={`${symbol}-${name} || info, preview and analysis`}>
      <main className="px-2 md:px-4 lg:px-9 font-lato">
        <TopInfo info={data} />
        <Chart />
        <section className="mt-14">
          <div className="border rounded-lg p-2">
            <h2 className="text-xl font-bold">Introduction</h2>
            <p>Founded in {founded}</p>
            <p>{introduction}</p>
            <p>{technology}</p>
          </div>
          <div className="mt-4 flex flex-col">
            <div className="border rounded-lg p-2">
              <h2 className="text-xl font-bold">Whitepaper Abstract</h2>
              <p>{abstract}</p>
            </div>
            <div className="overflow-hidden pb-[56.25%] relative h-0">
              <iframe
                width="420"
                height="315"
                src={video.url.replace("watch?v=", "embed/")}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${name} video`}
                className="left-0 top-0 absolute w-full h-full"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <div className="border rounded-lg p-2 mb-10">
              <h2 className="text-xl font-bold">Socials</h2>
              <span>
                Visit the <b>{name}</b> website at{" "}
              </span>
              <a href={website.url}>{website.url}</a>
              <div className="font-extrabold text-lg flex items-center gap-2">
                {facebook.length > 0 && (
                  <a className="text-[#3b5998]" href={facebook}>
                    facebook
                  </a>
                )}
                {twitter.length > 0 && (
                  <a className="text-[#00acee]" href={twitter}>
                    twitter
                  </a>
                )}
                {medium.length > 0 && (
                  <a className="text-black" href={medium}>
                    medium
                  </a>
                )}
                {reddit.length > 0 && (
                  <a className="text-[#FF4500]" href={reddit}>
                    reddit
                  </a>
                )}
                {vimeo.length > 0 && (
                  <a className="text-[#86c9ef]" href={vimeo}>
                    vimeo
                  </a>
                )}
                {discord.length > 0 && (
                  <a className="text-[#5865F2]" href={discord}>
                    discord
                  </a>
                )}
                {telegram.length > 0 && (
                  <a className="text-[#229ED9]" href={telegram}>
                    telegram
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Coin;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get(
    "https://api.coinpaper.io/v1/coins/overview"
  );

  const paths = data.map((coin: Coin) => ({
    params: { id: coin.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;

    const response = await axios.get(
      `https://api.coinpaper.io/v1/coins/${id}/infohub`
    );

    const { data } = await axios.get(
      "https://api.coinpaper.io/v1/coins/overview"
    );

    const info = data.filter(
      (coin: ExtendedCoin) => coin.id === id
    )[0] as ExtendedCoin;

    return { props: { info: response.data, infoFromOverview: info } };
  } catch (error: any) {
    console.log(error);
    return { props: { info: error.message } };
  }
};
