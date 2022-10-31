import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../LineChart/LineChart";
import { Card } from "antd";
import { mqttPayloadSelector } from "../../../services/mqtt/mqttSlice";
import { dataAnalyzingActions, dataExperimentSelector } from "../../../features/dataAnalyzing/services/dataAnalyzingSlice";
import { currentIDSelector } from "../../../features/auth/services/authSlice";

export const ChartData = () => {

  const studentID = useSelector(currentIDSelector);

  const dataExperiment = useSelector(dataExperimentSelector).filter(item => item.id === studentID);





  const [labels, setLabels] = useState(["1", "2"]);

  const [columns, setColumns] = useState([
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      fill: true,
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: true,
    },
  ]);

  const options = {
    isStacked: false,
    position: "top",
  };
  return (
    <Card title="Biểu đồ">
      <LineChart
        title="Line chart data"
        labels={labels}
        columns={columns}
        options={options}
      />
    </Card>
  );
};
