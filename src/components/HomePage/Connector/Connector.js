import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Connector.module.scss";
import { Button, Form, Input, Card, Modal, Tooltip, notification } from "antd";
import { authSliceActions, currentIDSelector } from "../../../features/auth/services/authSlice";
import { connectionStatusSelector, isSubedSelector } from "../../../services/mqtt/mqttSlice";
import { ExclamationCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { GET_HISITORY } from "../../../services/mqtt/mqttType";
import { dataAnalyzingActions } from "../../../features/dataAnalyzing/services/dataAnalyzingSlice";

const Connector = ({mqttConnect, mqttDisconnect, mqttSub, mqttUnSub, mqttPublish}) => {
  const dispatch = useDispatch()
  const [topic, setTopic] = useState("");
  
  const connectionStatus = useSelector(connectionStatusSelector);
  const isSubed = useSelector(isSubedSelector);
  const currentTopic = useSelector(currentIDSelector);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setTopic(values.nameComputer + "_" + values.studentID);
    dispatch(authSliceActions.setCurrentUserID(values.nameComputer + "_" + values.studentID));
    const host = 'broker.emqx.io';
    // const host = 'broker.mqttdashboard.com';
    const port = 8083;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    options.clientId = values.studentID;
    mqttConnect(url, options);
  };

  const onConfirmDisconnect = () => {
    Modal.confirm({
      title: 'Bạn có muốn ngắt kết nối này không?',
      icon: <ExclamationCircleOutlined />,
      content: 'Xác nhận ngắt kết nối sẽ xoá hết toàn bộ dữ liệu hiện tại!',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Bỏ qua',
      onOk() {
        onReset();
      }
    });
  };

  const onReset = () => {
    form.resetFields();
    mqttDisconnect();
    dispatch(dataAnalyzingActions.resetDataByID({id: currentTopic}));
  };

  const onCopyTopic = () => {
    if (currentTopic && currentTopic !== "") {
      navigator.clipboard.writeText(currentTopic);
      notification['success']({
        message: 'Copy thành công',
        duration: 1.5
      });
    }
  }


  useEffect(() => {
    if (connectionStatus === "Connected" && isSubed === false) {
      mqttSub({topic: topic, qos: 0});
      mqttPublish({ topic: currentTopic, qos: 0, payload: JSON.stringify({ type: GET_HISITORY })});
    }
    else if (connectionStatus === "Disconnected" && isSubed === true) {
      mqttUnSub({topic: topic, qos: 0});
    }
  }, [connectionStatus]);



  return (
    <div className={styles.container}>
      <Card
        title="Đăng nhập"
        actions={[
        ]}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="nameComputer"
            label="Tên máy"
            rules={[{ required: true, message: "\"Tên máy\" không được để trống!" }]}
          >
            <Input placeholder="T6_Ca1_M1" />
          </Form.Item>
          <Form.Item
            name="studentID"
            label="Mã sinh viên"
            rules={[
              { 
                required: true, 
                message: "\"Mã sinh viên\" không được để trống!" 
              },
              {
                validator(_, value) {
                  if (value) {
                    return value.trim().match(/^[B]{1}([1-9]{2})([A-Z]{4})([0-9]{3})$/)
                      ? Promise.resolve()
                      : Promise.reject("\"Mã sinh viên\" không đúng định dạng!")
                  }
                  return Promise.reject()
                }
              },
            ]}
          >
            <Input placeholder="B19DCCN067" />
          </Form.Item>

          <div className={styles.group_btn}>
            <Button type="primary" htmlType="submit">
              {connectionStatus}
            </Button>
            <Button danger onClick={onConfirmDisconnect}>
              Disconnect
            </Button>
            <Tooltip onClick={onCopyTopic} placement="bottomRight" title={"Copy topic nhập vào App"}>
              <Button type="primary" icon={<CopyOutlined/>}>
                Copy
              </Button>
            </Tooltip>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Connector;
