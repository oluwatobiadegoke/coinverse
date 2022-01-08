import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import useSWR from "swr";

import { Coin } from "../interfaces";
import Layout from "../components/Layout";
import Gainers from "../components/HomePage/Gainers";
import Trending from "../components/HomePage/Trending";
import CoinTable from "../components/HomePage/CoinTable";

export interface ExtendedCoin extends Coin {
  rank: number;
  price: number;
  market_cap: number;
  price_24h_percentage_change: number;
  price_7d_percentage_change: number;
  volume: number;
  price_1h_percentage_change: number;
  scores: {
    trend: number;
  };
}

interface Props {
  overview: ExtendedCoin[];
}

const Home = ({ overview }: Props) => {
  const [overviewCoins] = useState(overview);

  const fetcher = async () => {
    const res = await axios.get("https://api.coinpaper.io/v1/coins/overview");
    return res.data as Coin[];
  };

  const { data, error } = useSWR(
    "https://api.coinpaper.io/v1/coins/overview",
    fetcher,
    { refreshInterval: 60000 }
  );

  if (error) {
    return (
      <Layout title="Error">
        <p>An error occured</p>
      </Layout>
    );
  }

  if (!data && !overviewCoins) {
    return (
      <Layout title="Loading...">
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Coinverse cryptocurrency price, review and analysis">
      <main className="px-2 md:px-4 lg:px-9 font-lato">
        <div className="flex items-center justify-center flex-1 gap-1 font-bold mt-14 md:mt-20 mb-3 md:mb-5">
          <span className="text-pri-500 text-5xl font-shizuru">C</span>
          <span className="mt-1 text-xl md:text-2xl font-light">oinverse</span>
        </div>
        <div className="mb-20 px-6 text-center text-xl md:text-2xl font-light">
          <p className="mb-0">Bringing you</p>
          <p className="mb-0">undiluted info and analysis of our top coins</p>
        </div>
        <div className="my-4">
          <p className="text-base lg:text-xl font-bold font-lato">
            Today&apos;s cryptocurrency prices by market cap
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-10">
          <Gainers overviewCoins={overviewCoins} />
          <Trending overviewCoins={overviewCoins} />
        </div>
        <CoinTable overviewCoins={overviewCoins} />
      </main>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  //For getting overview detail which houses the trending and gainers parameters used for sorting
  const overview = await axios.get(
    "https://api.coinpaper.io/v1/coins/overview"
  );

  return {
    props: { overview: overview.data },
    revalidate: 6000,
  };
};
