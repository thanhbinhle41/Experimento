import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { dataExperimentSelector } from "../../services/dataAnalyzingSlice";

const StudentTable = (props) => {
  const { dataTable } = props;
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, record) => (
        <p style={{ color: "RGB(24, 144, 255)", margin: "0" }}>
          {record.index}
        </p>
      ),
    },
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
  return (
    <Table
      pagination={{ pageSize: 5 }}
      dataSource={dataTable}
      columns={columns}
    ></Table>
  );
};

export default StudentTable;
