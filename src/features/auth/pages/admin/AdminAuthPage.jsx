import { Card } from "antd";
import React from "react";
import AdminAuth from "../../components/admin/AdminAuth";

const AdminAuthPage = () => {
  return (
    <Card title="Đăng nhập (Admin)">
      <AdminAuth />
    </Card>
  );
};

export default AdminAuthPage;
