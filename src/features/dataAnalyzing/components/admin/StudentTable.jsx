import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { dataExperimentSelector } from "../../services/dataAnalyzingSlice";

const StudentTable = (props) => {
  const { dataTable } = props;
  const columns = [
    {
      title: "Khoảng cách",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "Điện áp",
      dataIndex: "voltage",
      key: "voltage",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
  ];
  return <Table dataSource={dataTable} columns={columns}></Table>;
};

export default StudentTable;
