import { useState, useEffect } from "react";
import HeaderForm from "./HeaderForm";
import useSWR from "swr";
import axios from "axios";

import { Coin } from "../../interfaces";

interface ExtendedCoin extends Coin {
  value: string;
}

const Header = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  const fetcher = async () => {
    const res = await axios.get("https://api.coinpaper.io/v1/coins/");
    return res.data as Coin[];
  };

  const { data, error } = useSWR("https://api.coinpaper.io/v1/coins/", fetcher);

  useEffect(() => {
    let coins: ExtendedCoin[] = [];
    if (data) {
      data.forEach((item) => {
        coins.push({ ...item, value: item.name });
      });
    }
    setCoins(coins);
  }, [data]);

  return (
    <header className="flex items-center py-2 px-9 border">
      <div className="flex items-center flex-1 gap-1 font-bold">
        <span className="text-pri-500 text-3xl font-shizuru">C</span>
        <span className="mt-1 text-lg font-light">oinverse</span>
      </div>
      <HeaderForm coins={coins} />
    </header>
  );
};

export default Header;
