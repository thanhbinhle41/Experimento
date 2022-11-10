import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../LineChart/LineChart";
import { Card, Empty } from "antd";
import { mqttPayloadSelector } from "../../../services/mqtt/mqttSlice";
import { dataAnalyzingActions, dataExperimentSelector } from "../../../features/dataAnalyzing/services/dataAnalyzingSlice";
import { currentIDSelector } from "../../../features/auth/services/authSlice";

export const ChartData = ({isDrawChart, dataTable}) => {

  // const [labels, setLabels] = useState([]);

  const labels = dataTable.map((data) => data.distance);

  console.log(dataTable);

  const columnsChart = [
    {
      label: "Voltage",
      data: dataTable.map((data) => data.voltage),
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
