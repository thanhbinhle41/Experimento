import React from 'react';
import styles from "./Connector.module.scss";
import { Button, Form, Input, Card } from 'antd';


const Connector = () => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 4,
            span: 20,
        },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className={styles.container}>
        <Card
            title="Đăng nhập"
            actions={[
                <Button type="primary" onClick={() => {}}>Kết nối</Button>,
                <Button danger onClick={onReset}>Ngắt kết nối</Button>
            ]}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="name_computer" label="Tên máy" rules={[{required: true}]}>
                    <Input placeholder="T6_Ca1_M1"/>
                </Form.Item>
                <Form.Item name="student_id" label="Mã sinh viên" rules={[{required: true}]}>
                    <Input placeholder="B19DCCN067"/>
                </Form.Item>
            </Form>
        </Card>
        </div>
    )
}

export default Connector;
