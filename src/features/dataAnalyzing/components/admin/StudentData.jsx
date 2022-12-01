import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Menu, Row } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { utils, writeFileXLSX } from "xlsx";

import { dataAnalyzingActions } from "../../services/dataAnalyzingSlice";
import { dataTypeConst } from "../../utils/constants";
import StudentChart from "./StudentChart";
import StudentTable from "./StudentTable";

const StudentData = (props) => {
  const { id, dataExperiment, chosenStudent, setChosenStudent } = props;

  const dispatch = useDispatch();

  const [selectedDataType, setSelectedDataType] = useState(null);
  const [selectedDataName, setSelectedDataName] = useState("");

  const axis = selectedDataName ? selectedDataName.split(" - ") : "";
  const xAxis = axis ? axis[0] : "";
  const yAxis = axis ? axis[1] : "";

  const dataById = dataExperiment.find((data) => data.id === id);
  let dataTable =
    !!dataById && selectedDataType
      ? dataById.dataFromCOM[selectedDataType]
      : [];
  dataTable = dataTable.map((item, index) => ({
    // ...item,
    ...item,
    index: index + 1,
    key: item.time,
  }));
  // const dataExcel = [];
  const getDataExcel = () => {
    let dataExcel = [];
    switch (selectedDataType) {
      case dataTypeConst.AV: {
        dataExcel = dataTable.map((data, index) => ({
          STT: index + 1,
          Ampe: data.ampe,
          Voltage: data.voltage,
          "Thời gian": data.time,
        }));
        break;
      }
      case dataTypeConst.CV: {
        dataExcel = dataTable.map((data, index) => ({
          STT: index + 1,
          Centimeter: data.centimeter,
          Voltage: data.voltage,
          "Thời gian": data.time,
        }));
        break;
      }
      case dataTypeConst.TV: {
        dataExcel = dataTable.map((data, index) => ({
          STT: index + 1,
          "Mốc thời gian đo": data.timePoint,
          Voltage: data.voltage,
          "Thời gian": data.time,
        }));
        break;
      }
      default:
        break;
    }

    return dataExcel;
  };

  const handleExportBtn = () => {
    const dataExcel = getDataExcel();
    const ws = utils.json_to_sheet(dataExcel);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws);
    writeFileXLSX(wb, id + "_" + selectedDataType + ".xlsx");
  };

  const handleCloseBtn = () => {
    dispatch(dataAnalyzingActions.setChosenFalseById(id));
    setChosenStudent(chosenStudent.filter((student) => student.id !== id));
  };

  const handleMenuClick = ({ key }) => {
    setSelectedDataType(key);
    const selectedTypeName = menuItems.find((item) => item.key === key).label;
    setSelectedDataName(selectedTypeName);
  };
  const menuItems = [
    {
      label: "Ampe - Voltage",
      key: dataTypeConst.AV,
    },
    {
      label: "Centimeter - Voltage",
      key: dataTypeConst.CV,
    },
    {
      label: "TimePoint - Voltage",
      key: dataTypeConst.TV,
    },
  ];

  const dataTypeSelectionMenu = (
    <Menu onClick={handleMenuClick} items={menuItems}></Menu>
  );
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
      title={<>Thông tin của {id}</>}
    >
      <Row>
        <Dropdown trigger={"click"} overlay={dataTypeSelectionMenu}>
          <Button>
            {selectedDataName ? selectedDataName : "Lựa chọn loại data"}{" "}
            <DownOutlined />
          </Button>
        </Dropdown>
      </Row>
      <Row>
        <Col lg={16}>
          <StudentChart
            id={id}
            dataTable={dataTable}
            xAxis={xAxis}
            yAxis={yAxis}
          />
        </Col>
        <Col lg={8}>
          <StudentTable
            id={id}
            dataTable={dataTable}
            xAxis={xAxis}
            yAxis={yAxis}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default StudentData;
