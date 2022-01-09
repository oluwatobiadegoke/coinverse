import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Line } from "@ant-design/plots";
import axios from "axios";
import useSWR from "swr";
import moment from "moment";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { timerange } from "./timerange";

interface historyProps {
  timestamp: string;
  price: number;
  volume: number;
}

const Chart = () => {
  const router = useRouter();

  const { id } = router.query;

  const [history, setHistory] = useState<string>("history_1y");
  const [chartConfig, setChartConfig] = useState<historyProps[]>([]);
  const [rangeName, setRangeName] = useState("1 year");

  const fetcher = async () => {
    const res = await axios.get(
      `https://api.coinpaper.io/v1/coins/${id}/price/history?timerange=all`
    );
    return res.data;
  };

  const { data } = useSWR(
    `https://api.coinpaper.io/v1/coins/${id}/price/history?timerange=all`,
    fetcher
  );

  useEffect(() => {
    let reformedData: historyProps[] = [];
    if (data) {
      data[history].forEach((item: any) => {
        reformedData.push({
          timestamp: moment.unix(item.timestamp).format("MMM Do YY"),
          price: item.price,
          volume: item.volume,
        });
      });
    }
    setChartConfig(reformedData);
  }, [history, data]);

  useEffect(() => {
    setRangeName(timerange.filter((time) => time.id === history)[0].name);
  }, [history]);

  const config = {
    data: chartConfig,
    height: 400,
    xField: "timestamp",
    yField: "price",
    // annotations: [
    //   {
    //     type: "regionFilter",
    //     start: ["min", "median"],
    //     end: ["max", "0"],
    //     color: "#F4664A",
    //   },
    //   {
    //     type: "text",
    //     position: ["min", "median"],
    //     offsetY: -4,
    //     style: {
    //       textBaseline: "bottom",
    //     },
    //   },
    //   {
    //     type: "line",
    //     start: ["min", "median"],
    //     end: ["max", "median"],
    //     style: {
    //       stroke: "#F4664A",
    //       lineDash: [2, 2],
    //     },
    //   },
    // ],
  };

  const handleMenuClick = (e: any) => {
    setHistory(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {timerange.map((item) => {
        return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <section>
      <div className="flex mb-5 justify-between items-center">
        <p className="mb-0 text-lg md:text-xl font-semibold">
          {data?.name} {rangeName}
        </p>
        <Dropdown overlay={menu}>
          <Button>
            Select Range <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Line {...config} />
    </section>
  );
};

export default Chart;
