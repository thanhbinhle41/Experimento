import {React, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Publisher.module.scss";
import { Button, Form, Input, Card } from "antd";
import { dataAnalyzingActions } from "../../../dataAnalyzing/services/dataAnalyzingSlice";
import { currentIDSelector } from "../../../auth/services/authSlice";

const Publisher = ({ mqttPublish }) => {
  const dispatch = useDispatch();

  // SELECTOR
  const currentUserID = useSelector(currentIDSelector);


  //USE STATE
  const [isSendContinuous, setIsSendContinuous] = useState(false);
  const [isShowTimeInput, setIsShowTimeInput] = useState(false);
  const [intervalSend, setIntervalSend] = useState(null);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(dataAnalyzingActions.setCurrentDistance(values.distance));
    const payload = {
      type: "get-live-data",
      data: {
        distance: values.distance,
      },
    };
    if (isShowTimeInput) {
      console.log("send continuous")
      setTimeout(() => {
        setIsSendContinuous(true);
      }, 150);
      payload.data["time"] = values.timeSend;
      mqttPublish({ topic: currentUserID, qos: 0, payload: JSON.stringify(payload)});
      let sendContinuos = setInterval(() => {
        mqttPublish({ topic: currentUserID, qos: 0, payload: JSON.stringify(payload)});
        console.log("Publish", payload);
      }, values.timeSend * 1000)
      setIntervalSend(sendContinuos);
    }
    else {
      console.log("Publish", payload);
      mqttPublish({ topic: currentUserID, qos: 0, payload: JSON.stringify(payload)});
    }
  };

  const onSendContinous = () => {
    setIsShowTimeInput(!isShowTimeInput);
  }

  const onStopSendContinous = () => {
    clearInterval(intervalSend);
    setTimeout(() => {
      setIsSendContinuous(false);
    }, 150);
  }

  return (
    <div className={styles.container}>
      <Card title="Dữ liệu khoảng cách" actions={[]}>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="distance"
            label="Khoảng cách"
            rules={[
              { required: true, message: "Khoảng cách không được bỏ trống!" },
              {
                validator(_, value) {
                  if (!value || value === "") {
                    return Promise.reject();
                  }
                  return Number(value) <= 30
                    ? Promise.resolve()
                    : Promise.reject("Khoảng cách từ 0-30cm!")
                }
              }
            ]}
          >
            <Input placeholder="0 - 30cm" />
          </Form.Item>
          {isShowTimeInput &&
            <Form.Item
              name="timeSend"
              label="Khoảng thời gian gửi"
              rules={[
                { required: true, message: "Khoảng thời gian không được bỏ trống!" },
                {
                  validator(_, value) {
                    if (!value || value === "") {
                      return Promise.reject();
                    }
                    return Number(value) && Number(value) >= 1
                      ? Promise.resolve()
                      : Promise.reject("Thời gian không đúng định dạng!")
                  }
                }
              ]}
            >
              <Input placeholder="1s" />
            </Form.Item>
          }
          <div className={styles.group_btn}>
            {!isSendContinuous ? 
              <>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
                <Button type="dashed" onClick={onSendContinous}>
                  {isShowTimeInput ? "Tắt" : "Bật"} gửi liên tục
                </Button>
              </>
              :
              <Button danger onClick={onStopSendContinous}>
                Dừng gửi liên tục
              </Button>
            }  
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Publisher;
