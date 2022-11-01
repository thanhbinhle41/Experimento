import { Button, Col, Row } from "antd";
import React from "react";
import { CSVDownload, CSVLink } from "react-csv";
import { dataExperimentSelector } from "../../services/dataAnalyzingSlice";
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
  let dataCSV = [["STT", "Khoảng cách", "Điện áp", "Thời gian"]];
  dataCSV.push(
    ...dataTable.map((data, index) => [
      index + 1,
      data.distance,
      data.voltage,
      data.time,
    ])
  );
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
        <CSVLink filename={id} data={dataCSV}>
          <Button type="primary">Xuất file</Button>
        </CSVLink>
      </Row>
    </>
  );
};

export default StudentData;
