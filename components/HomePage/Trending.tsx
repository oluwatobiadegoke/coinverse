import { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineArrowUp } from "react-icons/ai";

import { ExtendedCoin } from "../../pages";

interface Props {
  overviewCoins: ExtendedCoin[];
}

const Trending = ({ overviewCoins }: Props) => {
  useEffect(() => {
    if (overviewCoins) {
      setTrending(
        overviewCoins
          .sort((a, b) => b.scores.trend - a.scores.trend)
          .slice(0, 3)
      );
    }
  }, [overviewCoins]);

  const [trending, setTrending] = useState<ExtendedCoin[]>([]);
  return (
    <div className="shadow p-4 rounded">
      <div className="flex items-center gap-2 mb-4">
        <Image src="/fire.png" width={25} height={25} alt="gainers-img" />
        <p className="mb-0 font-bold text-base">Trending</p>
      </div>
      <div className="flex flex-col gap-1">
        {trending.map((coin, index) => {
          const { id, name, symbol, price_1h_percentage_change } = coin;
          return (
            <div key={id} className="flex">
              <div className="flex-1 flex items-center gap-3">
                <span>{index + 1}</span>
                <span className="font-semibold w-12">{symbol}</span>
                <span>{name}</span>
              </div>
              <div
                className={`flex items-center gap-2 text-green-700 font-semibold ${
                  price_1h_percentage_change > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {price_1h_percentage_change > 0 ? (
                  <AiOutlineArrowUp />
                ) : (
                  <AiOutlineArrowUp />
                )}
                <span>{price_1h_percentage_change}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
