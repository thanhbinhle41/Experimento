import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { dataAnalyzingActions, dataExperimentSelector } from "../../../dataAnalyzing/services/dataAnalyzingSlice";
import { currentIDSelector } from "../../../auth/services/authSlice";
import { mqttPayloadSelector } from "../../../../services/mqtt/mqttSlice";
import { ChartData } from "../ChartData/ChartData";
import { utils, writeFileXLSX } from "xlsx";
import { DELETE_SINGLE_DATA_BY_ID, LIVE_DATA, RETURN_HISTORY } from "../../../../services/mqtt/mqttType";
import { DeleteOutlined } from '@ant-design/icons';
import styles from "./TableData.module.scss";


export const TableData = ({mqttPublish}) => {
	const dispatch = useDispatch();

  const payloadMessage = useSelector(mqttPayloadSelector);
  const currentTopic = useSelector(currentIDSelector);
  const dataExperiment = useSelector(dataExperimentSelector);

  //State
  const [isDrawChart, setIsDrawChart] = useState(false);

  let dataByStudentID = dataExperiment.find((data) => data.id === currentTopic);
  let dataTable = [];
  if (dataByStudentID) {
    let listData = [...dataByStudentID?.dataFromCOM];
    let len = listData.length;
    dataTable = listData.map((item, index) => ({
      ...item.data,
      id: len--,
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
    {
      title: 'Tác vụ',
      key: 'action',
      render: (_, record) => (
        <div className={styles.actions_table}>
            <a onClick={() => onDeleteSingleData(record)}>Delete</a>
            <DeleteOutlined style={{"color": "red"}}/>
        </div>
      ),
    },
  ];

  const onDeleteSingleData = (item) => {
    const payload = {
      type: DELETE_SINGLE_DATA_BY_ID,
      time: item.time
    };
    mqttPublish(currentTopic, payload);
  }

	useEffect(() => {
		console.log("Socket return", payloadMessage);
    if (payloadMessage?.message?.type) {
      const message = payloadMessage.message;
      switch (message.type) {
        case LIVE_DATA: {
          dispatch(
            dataAnalyzingActions.addVoltageByID({
              ID: message.id,
              data: message.data,
            })
          );
          break;
        }
        case RETURN_HISTORY: {
          console.log("return history")
          const id = message.id;
          const dataHistory = message.data;
          dispatch(dataAnalyzingActions.addData({ id, dataHistory }));
          break;
        }
        case DELETE_SINGLE_DATA_BY_ID: {
          console.log("Delete Single");
          const id = message.id;
          const time = message.time;
          dispatch(dataAnalyzingActions.deleteSingleDataById({ id, time }));
          break;
        }
        default:
          break
      }
    }
  }, [payloadMessage]);

  const onShowDataChart = () => {
    setIsDrawChart(true);
  }

  const handleExportBtn = () => {
    const dataExcel = dataTable.reverse().map((data, index) => ({
      STT: index + 1,
      "Khoảng cách": data.distance,
      "Điện áp": data.voltage,
      "Thời gian": data.time,
    }));
    const ws = utils.json_to_sheet(dataExcel);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws);
    writeFileXLSX(wb, currentTopic + ".xlsx");
  };

  return (
    <div className={styles.container}>
      <Card
        title="Bảng kết quả"
        actions={[
          <Button type="primary" onClick={onShowDataChart}>
            Vẽ biểu đồ
          </Button>,
          <Button type="primary" onClick={handleExportBtn}>
            Xuất file
          </Button>,
        ]}
      >
        <Table columns={columns} dataSource={dataTable} />
      </Card>
      <div style={{"paddingTop": "48px"}}>
        <ChartData isDrawChart={isDrawChart} dataTable={dataTable}/>
      </div>
    </div>
  );
};
