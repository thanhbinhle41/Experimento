import { Button, Table, Tag } from "antd";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataExperimentSelector } from "../../services/dataAnalyzingSlice";
import { dataAnalyzingActions } from "../../services/dataAnalyzingSlice.js";

const AdminTable = (props) => {
  const { isShowStudentData, setIsShowStudentData } = props;

  const dispatch = useDispatch();

  let dataExperiment = useSelector(dataExperimentSelector);
  let dataTable = [...dataExperiment];
  dataTable = dataTable.map((data, index) => ({ ...data, key: data.id }));
  const selectedRowKeys = dataTable
    .filter((data) => data.isChosen === true)
    .map((data) => data.id);

  const handleShowBtnOnClick = (id) => {
    console.log(id);
    const arrWithStatusChange = isShowStudentData.map((item) =>
      item.id === id ? { ...item, isShowData: !item.isShowData } : item
    );
    setIsShowStudentData(arrWithStatusChange);
  };

  const columns = [
    // {
    //   title: "Chọn",
    //   dataIndex: "isChosen",
    //   key: "isChosen",
    // },
    {
      title: "Tên máy",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "isOnline",
      key: "isOnline",
      render: (value) => (
        <>
          <Tag color={value ? "blue" : "red"}>
            {value ? "Online" : "Offline"}
          </Tag>
        </>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Button
    //       id={record.id}
    //       onClick={() => handleShowBtnOnClick(record.id)}
    //       type="primary"
    //     >
    //       Xem kết quả
    //     </Button>
    //   ),
    // },
  ];

  const handleOnChangeSelection = (selectedRowKeys, selectedRows, info) => {
    // selectedRows.forEach((selectedId) =>
    //   dispatch(
    //     dataAnalyzingActions.setOnlineByListId({ id: selectedId, value: true })
    //   )
    // );
    dispatch(dataAnalyzingActions.setChosenByListid(selectedRowKeys));
  };

  return (
    <Table
      rowSelection={{
        type: "checkbox",
        onChange: handleOnChangeSelection,
        selectedRowKeys: selectedRowKeys,
      }}
      dataSource={dataTable}
      columns={columns}
      rowKey={(record) => record.id}
    ></Table>
  );
};

export default AdminTable;
