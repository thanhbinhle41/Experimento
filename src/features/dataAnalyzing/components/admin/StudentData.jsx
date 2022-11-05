import { Button, Card, Col, Row } from "antd";
import React from "react";
import { utils, writeFileXLSX } from "xlsx";
import { useDispatch } from "react-redux";

import StudentChart from "./StudentChart";
import StudentTable from "./StudentTable";
import { dataAnalyzingActions } from "../../services/dataAnalyzingSlice";

const StudentData = (props) => {
  const { id, dataExperiment, chosenStudent, setChosenStudent } = props;

  const dispatch = useDispatch();

  let dataTable = dataExperiment.filter((data) => data.id === id);
  dataTable = dataTable[0].dataFromCOM.map((item, index) => ({
    // ...item,
    distance: item.data.distance,
    voltage: item.data.voltage,
    time: item.data.time,
    index: index + 1,
    key: item.data.time,
  }));
  // console.log(dataTable);
  const dataExcel = dataTable.map((data, index) => ({
    STT: index + 1,
    "Khoảng cách": data.distance,
    "Điện áp": data.voltage,
    "Thời gian": data.time,
  }));
  // console.log(dataExcel);

  const handleExportBtn = () => {
    const ws = utils.json_to_sheet(dataExcel);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws);
    writeFileXLSX(wb, id + ".xlsx");
  };

  const handleCloseBtn = () => {
    dispatch(dataAnalyzingActions.setChosenFalseById(id));
    setChosenStudent(chosenStudent.filter((student) => student.id !== id));
  };
  return (
    <Card
      actions={[
        <Button onClick={handleExportBtn} type="primary">
          Xuất file
        </Button>,
      ]}
      extra={
        <Button type="danger" onClick={handleCloseBtn}>
          Đóng
        </Button>
      }
      title={`Thông tin của ${id}`}
    >
      <Row>
        <Col lg={16}>
          <StudentChart id={id} dataTable={dataTable} />
        </Col>
        <Col lg={8}>
          <StudentTable id={id} dataTable={dataTable} />
        </Col>
      </Row>
    </Card>
  );
};

export default StudentData;
