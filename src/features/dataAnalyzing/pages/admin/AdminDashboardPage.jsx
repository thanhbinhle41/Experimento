import { Card } from "antd";
import React from "react";
import AdminTable from "../../components/admin/AdminTable";
import StudentData from "../../components/admin/StudentData";
import { dataExperimentSelector } from "../../services/dataAnalyzingSlice";
import { useSelector } from "react-redux";

const AdminDashboardPage = () => {
  const dataExperiment = useSelector(dataExperimentSelector);

  return (
    <>
      <Card title="Danh sách máy">
        <AdminTable />
      </Card>
      <Card title="Thông tin chi tiết">
        {dataExperiment.map((student) => (
          <StudentData id={student.id} dataExperiment={dataExperiment} />
        ))}
      </Card>
    </>
  );
};

export default AdminDashboardPage;
