import { Col, Row } from "antd";
import React from "react";
import { dataExperimentSelector } from "../../services/dataAnalyzingSlice";
import StudentChart from "./StudentChart";
import StudentTable from "./StudentTable";

const StudentData = (props) => {
  const { id, dataExperiment } = props;
  let dataTable = dataExperiment.filter((data) => data.id === id);
  dataTable = dataTable[0].dataFromCOM;
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
    </>
  );
};

export default StudentData;
