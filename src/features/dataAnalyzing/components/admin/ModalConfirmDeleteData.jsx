import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router";
import { persistor } from "../../../../store/store";

const ModalConfirmDeleteData = (props) => {
  const { isShowConfirmDelete, setIsShowConfirmDelete } = props;

  const navigate = useNavigate();

  const handleDeleteDataBtn = async () => {
    await persistor.purge();
    navigate("/admin/login");
  };
  const handleCancleBtn = () => {
    setIsShowConfirmDelete(false);
  };
  return (
    <Modal
      title="Xác nhận"
      centered
      open={isShowConfirmDelete}
      onOk={handleDeleteDataBtn}
      onCancel={handleCancleBtn}
      closeIcon={
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "15px",
          }}
        >
          <CloseOutlined />
        </div>
      }
      okText="Xác nhận"
      cancelText="Hủy"
    >
      Xóa tất cả các thông tin hiện tại đang có và đăng xuất?
    </Modal>
  );
};

export default ModalConfirmDeleteData;
