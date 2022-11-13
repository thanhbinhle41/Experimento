import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { persistor } from "../../../../store/store";

const ModalConfirmDeleteData = (props) => {
  const { isShowConfirmDelete, setIsShowConfirmDelete } = props;

  const navigate = useNavigate();

  const handleDeleteDataBtn = async () => {
    const purgePersistor = await persistor.purge();
    navigate(0);
    // console.log(purgePersistor);
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
      okText="Xác nhận"
      cancelText="Hủy"
    >
      Xóa thông tin hiện tại đang có?
    </Modal>
  );
};

export default ModalConfirmDeleteData;
