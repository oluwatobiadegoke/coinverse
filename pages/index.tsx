import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import useSWR from "swr";

import { Coin } from "../interfaces";
import Layout from "../components/Layout";
import Gainers from "../components/HomePage/Gainers";
import Trending from "../components/HomePage/Trending";

export interface ExtendedCoin extends Coin {
  price_1h_percentage_change: number;
  scores: {
    trend: number;
  };
}

interface Props {
  serverCoins: ExtendedCoin[];
  overview: ExtendedCoin[];
}

const Home = ({ serverCoins, overview }: Props) => {
  const [coins] = useState(serverCoins);
  const [overviewCoins] = useState(overview);

  const fetcher = async () => {
    const res = await axios.get("https://api.coinpaper.io/v1/coins/");
    return res.data as Coin[];
  };

  const { data, error } = useSWR(
    "https://api.coinpaper.io/v1/coins/",
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

  if (!data && !coins) {
    return (
      <Layout title="Loading...">
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Coinverse cryptocurrency price, review and analysis">
      <main className="px-9 font-lato">
        <div className="my-4">
          <p className="text-xl font-bold font-lato">
            Today&apos;s cryptocurrency prices by market cap
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Gainers overviewCoins={overviewCoins} />
          <Trending overviewCoins={overviewCoins} />
        </div>
        {coins.map((coin) => {
          return (
            <div key={coin.id}>
              <p>{coin.name}</p>
            </div>
          );
        })}
      </main>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("https://api.coinpaper.io/v1/coins/");
  //For getting overview detail which houses the trending and gainers parameters used for sorting
  const overview = await axios.get(
    "https://api.coinpaper.io/v1/coins/overview"
  );

  console.log({ overview: overview.data });

  return {
    props: { serverCoins: response.data, overview: overview.data },
    revalidate: 6000,
  };
};
