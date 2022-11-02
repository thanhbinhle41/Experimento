import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "./Publisher.module.scss";
import { Button, Form, Input, Card } from 'antd';
import { dataAnalyzingActions } from '../../../features/dataAnalyzing/services/dataAnalyzingSlice';
import { currentIDSelector } from '../../../features/auth/services/authSlice';

const Publisher = ({ mqttPublish }) => {
    const dispatch = useDispatch();
    const currentUserID = useSelector(currentIDSelector);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const [form] = Form.useForm();

    const onFinish = (values, type="once") => {
        dispatch(dataAnalyzingActions.setCurrentDistance(values.distance));
        const payload = JSON.stringify({
            type: "get-live-data",
            data: {
                "distance": values.distance
            }
        });
        mqttPublish({topic: currentUserID, qos: 0, payload});
    };

    return (
        <div className={styles.container}>
        <Card
            title="Dữ liệu khoảng cách"
            actions={[
                
            ]}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="distance" label="Khoảng cách" rules={[{required: true}]}>
                    <Input placeholder="0 - 30cm"/>
                </Form.Item>
                <div className={styles.group_btn}>
                    <Button type="primary" htmlType='submit'>Gửi</Button>
                    <Button type="primary" onClick={() => {}}>Gửi liên tục</Button>
                </div>
            </Form>
        </Card>
        </div>
    )
}


export default Publisher