import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../LineChart/LineChart";
import { Card } from "antd";
import { mqttPayloadSelector } from "../../../services/mqtt/mqttSlice";
import { dataAnalyzingActions, dataExperimentSelector } from "../../../features/dataAnalyzing/services/dataAnalyzingSlice";
import { currentIDSelector } from "../../../features/auth/services/authSlice";

export const ChartData = ({isDrawChart, setIsDrawChart}) => {

  const studentID = useSelector(currentIDSelector);

  const dataExperiment = useSelector(dataExperimentSelector);

  const [labels, setLabels] = useState([]);

  let dataTable = dataExperiment.filter((data) => data.id === studentID);
  if (dataTable) {
    dataTable = dataTable[0]?.dataFromCOM.map((data, index) => ({
      ...data,
      id: index + 1,
      key: index,
    }));
  }

  useEffect(() => {
    if (isDrawChart && dataTable) {
      let newColums = [...columnsChart];
      let newDataChart = dataTable.map((data) => data.voltage);
      let newLabels = dataTable.map((data) => data.distance);
      setLabels([...newLabels]);
      newColums[0].data = newDataChart;
      setColumnsChart([...newColums]);
      setIsDrawChart(false);
    }
  }, [isDrawChart])




  const [columnsChart, setColumnsChart] = useState([
    {
      label: "Voltage",
      data: [],
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
        columns={columnsChart}
        options={options}
      />
    </Card>
  );
};
