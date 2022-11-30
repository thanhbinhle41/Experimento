import React, { useEffect, useState } from "react";
// import LineChart from "../../../../components/LineChart/LineChart";
import { Card, Empty } from "antd";
import ScatterChart from "../../../../components/ScatterChart/ScatterChart";

export const ChartData = ({isDrawChart, dataTable}) => {

  // const [labels, setLabels] = useState([]);

  
  const labels = dataTable ? dataTable.map((data) => data.distance) : [];

  const columnsChart = [
    {
      label: "Voltage",
      data: dataTable ? dataTable.map((data) => data.voltage) : [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      fill: false,
      showLine: true,
    },
  ];

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Khoảng cách",
        },
        min: 0,
        max: 30,
        ticks: {
          // forces step size to be 50 units
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        title: {
          display: true,
          text: "Điện áp",
        },
      },
    },
  };

  return (
    <Card title="Biểu đồ">
      {isDrawChart ? 
        <ScatterChart
          title="Line chart data"
          labels={labels}
          columns={columnsChart}
          options={options}
        />
        : <Empty />
      }
    </Card>
  );
};
