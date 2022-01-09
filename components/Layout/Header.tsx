import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import HeaderForm from "./HeaderForm";
import { Coin } from "../../interfaces";

interface ExtendedCoin extends Coin {
  value: string;
}

const Header = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [mobileSearchToggle, setMobileSearchToggle] = useState(true);

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
    <header className="flex items-center space-between gap-4 h-14 py-2 px-2 md:px-4 lg:px-9 border">
      {mobileSearchToggle ? (
        <Link href="/">
          <a className="flex md:hidden items-center flex-1 gap-1 font-bold">
            <span className="text-pri-500 text-3xl font-shizuru">C</span>
            <span className="mt-1 text-lg font-light text-black">oinverse</span>
          </a>
        </Link>
      ) : (
        <div className="w-full block md:hidden">
          <HeaderForm coins={coins} />
        </div>
      )}
      {/* Only on display on mobile to toggle the search form */}
      <div
        className="w-8 h-8 flex md:hidden items-center justify-center rounded-full shadow cursor-pointer hover:bg-gray-200 transition"
        onClick={() => setMobileSearchToggle(!mobileSearchToggle)}
      >
        {mobileSearchToggle ? (
          <AiOutlineSearch className="text-lg" />
        ) : (
          <AiOutlineClose className="text-lg" />
        )}
      </div>

      {/* Logo for larger-screen devices */}
      <Link href="/">
        <a className="hidden md:flex items-center flex-1 gap-1 font-bold">
          <span className="text-pri-500 text-3xl font-shizuru">C</span>
          <span className="mt-1 text-lg font-light text-black">oinverse</span>
        </a>
      </Link>

      {/* The search form for larger-screens devices */}
      <div className="hidden md:block">
        <HeaderForm coins={coins} />
      </div>
    </header>
  );
};

export default Header;
