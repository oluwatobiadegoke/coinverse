import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import useSWR from "swr";

import { Coin } from "../interfaces";
import Layout from "../components/Layout";

type Props = {
  serverCoins: Coin[];
};

const Home = ({ serverCoins }: Props) => {
  const [coins] = useState(serverCoins);

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
      <div>
        {coins.map((coin) => {
          return (
            <div key={coin.id}>
              <p>{coin.name}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("https://api.coinpaper.io/v1/coins/");

  return { props: { serverCoins: response.data }, revalidate: 6000 };
};
