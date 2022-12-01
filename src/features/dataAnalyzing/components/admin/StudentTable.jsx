import { Table } from "antd";
import React from "react";

const StudentTable = (props) => {
  const { dataTable, xAxis, yAxis } = props;
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
      title: xAxis,
      dataIndex: xAxis.toLowerCase(),
      key: xAxis.toLowerCase(),
    },
    {
      title: yAxis,
      dataIndex: yAxis.toLowerCase(),
      key: yAxis.toLowerCase(),
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
