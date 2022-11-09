import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { dataAnalyzingActions, dataExperimentSelector } from "../../../features/dataAnalyzing/services/dataAnalyzingSlice";
import { currentIDSelector } from "../../../features/auth/services/authSlice";
import { mqttPayloadSelector } from "../../../services/mqtt/mqttSlice";
import { ChartData } from "../ChartData/ChartData";


export const TableData = () => {
	const dispatch = useDispatch();

  const payloadMessage = useSelector(mqttPayloadSelector);
  const studentID = useSelector(currentIDSelector);
  const dataExperiment = useSelector(dataExperimentSelector);

  //State
  const [isDrawChart, setIsDrawChart] = useState(false);

  let dataTable = dataExperiment.filter((data) => data.id === "B19DCCN067");
  if (dataTable) {
    dataTable = dataTable[0]?.dataFromCOM.map((data, index) => ({
      ...data,
      id: index + 1,
      key: index,
    }));
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Khoảng cách",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "Giá trị điện trở",
      dataIndex: "voltage",
      key: "voltage",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
  ];

	useEffect(() => {
		console.log("Socket return", payloadMessage);
    if (payloadMessage?.message?.type === "live-data") {
      const res = payloadMessage.message;
      dispatch(
        dataAnalyzingActions.addVoltageByID({
          ID: studentID,
          voltage: res.data.voltage,
          time: res.data.time
        })
      );
    }
  }, [payloadMessage]);

  const onShowDataChart = () => {
    setIsDrawChart(true);
  }

  console.log(dataTable);

  return (
    <div>
      <Card
        title="Bảng kết quả"
        actions={[
          <Button type="primary" onClick={onShowDataChart}>
            Vẽ biểu đồ
          </Button>,
        ]}
      >
        <Table columns={columns} dataSource={dataTable} />
      </Card>
      <div style={{"padding-top": "48px"}}>
        <ChartData isDrawChart={isDrawChart} dataTable={dataTable}/>
      </div>
    </div>
  );
};
