import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import useSWR from "swr";

import { Coin } from "./interfaces";

type Props = {
  serverCoins: Coin[];
};

const Home = ({ serverCoins }: Props) => {
  const [coins] = useState(serverCoins);

  const fetcher = async () => {
    const res = await axios.get("www.static.coinpaper.io/api/coins.json");
    return res.data as Coin[];
  };

  const { data, error } = useSWR(
    "www.static.coinpaper.io/api/coins.json",
    fetcher,
    { refreshInterval: 60000 }
  );

  if (error) {
    return (
      <div className="error">
        <p>An error occured</p>
      </div>
    );
  }

  if (!data && !coins) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <p>This is the homepage</p>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    "https://static.coinpaper.io/api/coins.json"
  );
  console.log(response.data);

  return { props: { serverCoins: response.data }, revalidate: 6000 };
};
