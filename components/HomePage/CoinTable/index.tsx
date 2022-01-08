import { useEffect, useState } from "react";
import { Table } from "antd";

import { ExtendedCoin } from "../../../pages";
import { ReformedData } from "../../../interfaces";
import { columns } from "./columns";

interface Props {
  overviewCoins: ExtendedCoin[];
}

const CoinTable = ({ overviewCoins }: Props) => {
  const [coins] = useState(overviewCoins);
  const [reformedData, setReformedData] = useState<ReformedData[]>([]);

  let dollars = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    let data: ReformedData[] = [];
    coins.forEach((coin: ExtendedCoin) => {
      const {
        id,
        rank,
        name,
        symbol,
        price,
        market_cap,
        volume,
        price_1h_percentage_change,
        price_24h_percentage_change,
        price_7d_percentage_change,
      } = coin;
      data.push({
        key: id,
        id,
        symbol,
        rank,
        name,
        price: dollars.format(Number(price.toFixed(2))),
        oneh_change: price_1h_percentage_change,
        twentyfourh_change: price_24h_percentage_change,
        seven_days_change: price_7d_percentage_change,
        market_cap: dollars.format(Number(market_cap.toFixed(2))),
        volume: dollars.format(Number(volume.toFixed(2))),
      });
    });
    setReformedData(data.sort((a, b) => a.rank - b.rank));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewCoins, coins]);

  return (
    <div>
      <Table columns={columns} dataSource={reformedData} scroll={{ x: 1300 }} />
    </div>
  );
};

export default CoinTable;
