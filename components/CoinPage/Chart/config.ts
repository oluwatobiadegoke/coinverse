export const config = (data: any) => {
  return {
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    annotations: [
      {
        type: "regionFilter",
        start: ["min", "median"],
        end: ["max", "0"],
        color: "#F4664A",
      },
      {
        type: "text",
        position: ["min", "median"],
        content: "中位数",
        offsetY: -4,
        style: {
          textBaseline: "bottom",
        },
      },
      {
        type: "line",
        start: ["min", "median"],
        end: ["max", "median"],
        style: {
          stroke: "#F4664A",
          lineDash: [2, 2],
        },
      },
    ],
  };
};
