import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export const columns = [
  {
    title: "#",
    dataIndex: "rank",
    key: "rank",
    fixed: "left" as "left",
    width: "70px",
    sorter: (a: any, b: any) => a.rank - b.rank,
    sortDirections: ["descend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left" as "left",
    width: "125px",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a: any, b: any) => a.price - b.price,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "1h Change",
    dataIndex: "oneh_change",
    key: "oneh_change",
    render: (change: number) => (
      <div
        className={`flex items-center gap-1 font-bold ${
          change > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {change > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        <span>{change}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.oneh_change - b.oneh_change,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "24h Change",
    dataIndex: "twentyfourh_change",
    key: "twentyfourh_change",
    render: (change: number) => (
      <div
        className={`flex items-center gap-1 font-bold ${
          change > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {change > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        <span>{change}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.twentyfourh_change - b.twentyfourh_change,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "7d Change",
    dataIndex: "seven_days_change",
    key: "seven_days_change",
    render: (change: number) => (
      <div
        className={`flex items-center gap-1 font-bold ${
          change > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {change > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        <span>{change}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.seven_days_change - b.seven_days_change,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Marketcap",
    dataIndex: "market_cap",
    key: "market_cap",
  },
  {
    title: "Volume",
    dataIndex: "volume",
    key: "volume",
  },
];
