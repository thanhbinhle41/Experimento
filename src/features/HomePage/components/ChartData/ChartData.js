import React, { useEffect, useState } from "react";
import LineChart from "../../../../components/LineChart/LineChart";
import { Card, Empty } from "antd";

export const ChartData = ({isDrawChart, dataTable}) => {

  // const [labels, setLabels] = useState([]);

  
  const labels = dataTable ? dataTable.map((data) => data.distance) : [];

  const columnsChart = [
    {
      label: "Voltage",
      data: dataTable ? dataTable.map((data) => data.voltage) : [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      fill: true,
    },
    // {
    //   label: "Voltage",
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   borderColor: "rgb(53, 162, 235)",
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    //   fill: true,
    // },
  ];

  const options = {
    isStacked: false,
    position: "top",
  };

  return (
    <Card title="Biểu đồ">
      {isDrawChart ? 
        <LineChart
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
