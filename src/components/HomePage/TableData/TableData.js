import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { dataAnalyzingActions, dataExperimentSelector } from "../../../features/dataAnalyzing/services/dataAnalyzingSlice";
import { currentIDSelector } from "../../../features/auth/services/authSlice";
import { mqttPayloadSelector } from "../../../services/mqtt/mqttSlice";

export const TableData = () => {
	const dispatch = useDispatch();

  const payloadMessage = useSelector(mqttPayloadSelector);
  const studentID = useSelector(currentIDSelector);
  const dataExperiment = useSelector(dataExperimentSelector);

	// const [dataTable, setDataTable] = useState([]);

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
		console.log(payloadMessage);
    if (payloadMessage.topic) {
      const message = payloadMessage.message;
      dispatch(
        dataAnalyzingActions.addVoltageByID({
          ID: studentID,
          voltage: message,
        })
      );
			// let tmpData = [];
			// let listData = dataExperiment.filter(item => item.id === studentID);
			// for (let i = 0; i < listData.length; i++) {
			// 	tmpData.push({
			// 		key: i,
			// 		id: i+1,
			// 		distance: listData.distance,
			// 		voltage: listData.voltage,
			// 		time: listData.time,
			// 	})
			// }
			// setDataTable(tmpData);
    }
  }, [payloadMessage]);



  const dataTable = [
    {
      key: "1",
      id: 1,
      distance: 12,
      voltage: 3.52,
      time: "28/10/2022 - 8:12:42",
    },
    {
      key: "2",
      id: 2,
      distance: 2,
      voltage: 0.32,
      time: "28/10/2022 - 8:15:30",
    },
  ];
  return (
    <div>
      <Card
        title="Bảng kết quả"
        actions={[
          <Button type="primary" onClick={() => {}}>
            Vẽ biểu đồ
          </Button>,
        ]}
      >
        <Table columns={columns} dataSource={dataTable} />
      </Card>
    </div>
  );
};
