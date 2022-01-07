import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";

import { Coin } from "../../interfaces";
import Layout from "../../components/Layout";

type Props = {
  info: Coin;
};

const Coin = ({ info: { name, symbol } }: Props) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Layout title={`${symbol}-${name} || info, preview and analysis`}>
      <div>
        <p>{name}</p>
      </div>
    </Layout>
  );
};

export default Coin;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get("https://api.coinpaper.io/v1/coins/");

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
    return { props: { info: response.data } };
  } catch (error: any) {
    console.log(error);
    return { props: { info: error.message } };
  }
};
