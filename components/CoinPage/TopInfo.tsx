import { GiRank1 } from "react-icons/gi";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineDonutSmall } from "react-icons/md";

export type TopInfoProps = {
  name: string;
  symbol: string;
  rank: number;
  price: number;
  market_cap: number;
};

interface Props {
  info: TopInfoProps;
}

const TopInfo = ({
  info: { name, symbol, rank, price, market_cap },
}: Props) => {
  let dollars = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className=" my-20">
      <div className="flex items-center justify-center text-gray-500">
        <span className="font-shizuru font-bold  text-6xl">{symbol}-</span>{" "}
        <span className="font-light text-5xl mt-2">{name}</span>
      </div>
      <div className="max-w-lg mx-auto w-full flex items-center justify-center flex-wrap gap-2 mt-5">
        <div className="flex items-center gap-1 bg-gray-100 text-black px-4 rounded-xl">
          <GiRank1 />
          <span className="font-light">Rank:</span>
          <span>{rank}</span>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 text-black px-4 rounded-xl shadow">
          <IoPricetagOutline />
          <span className="font-light">Price:</span>
          <span>{dollars.format(Number(price.toFixed(2)))}</span>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 text-black px-4 rounded-xl shadow">
          <MdOutlineDonutSmall />
          <span className="font-light">Marketcap:</span>
          <span>{dollars.format(Number(market_cap.toFixed(2)))}</span>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
