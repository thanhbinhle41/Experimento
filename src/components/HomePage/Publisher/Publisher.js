import React from 'react'
import styles from "./Publisher.module.scss";
import { Button, Form, Input, Card } from 'antd';

const Publisher = () => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const [form] = Form.useForm();

    return (
        <div className={styles.container}>
        <Card
            title="Dữ liệu khoảng cách"
            actions={[
                <Button type="primary" onClick={() => {}}>Gửi</Button>
            ]}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={() => {}}>
                <Form.Item name="distance" label="Khoảng cách" rules={[{required: true}]}>
                    <Input placeholder="0 - 30cm"/>
                </Form.Item>
            </Form>
        </Card>
        </div>
    )
}


export default Publisher