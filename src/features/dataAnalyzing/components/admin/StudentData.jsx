import { Button, Col, Row } from "antd";
import React from "react";
import { utils, writeFileXLSX } from "xlsx";

import StudentChart from "./StudentChart";
import StudentTable from "./StudentTable";

const StudentData = (props) => {
  const { id, dataExperiment } = props;
  let dataTable = dataExperiment.filter((data) => data.id === id);
  dataTable = dataTable[0].dataFromCOM.map((data, index) => ({
    ...data,
    index: index + 1,
    key: data.time,
  }));
  console.log(dataTable);
  const dataExcel = dataTable.map((data, index) => ({
    STT: index + 1,
    "Khoảng cách": data.distance,
    "Điện áp": data.voltage,
    "Thời gian": data.time,
  }));
  console.log(dataExcel);

  const handleExportBtn = () => {
    const ws = utils.json_to_sheet(dataExcel);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws);
    writeFileXLSX(wb, id + ".xlsx");
  };
  return (
    <>
      <Row>
        <Col lg={16}>
          <StudentChart id={id} dataTable={dataTable} />
        </Col>
        <Col lg={8}>
          <StudentTable id={id} dataTable={dataTable} />
        </Col>
      </Row>
      <Row>
        <Button onClick={handleExportBtn} type="primary">
          Xuất file
        </Button>
      </Row>
    </>
  );
};

export default StudentData;
