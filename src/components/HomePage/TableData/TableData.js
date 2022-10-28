import React from 'react'
import { Button, Card, Table } from 'antd';

export const TableData = () => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Khoảng cách',
            dataIndex: 'distance',
            key: 'distance',
        },
        {
            title: 'Giá trị điện trở',
            dataIndex: 'voltage',
            key: 'voltage',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
    ];
    const data = [
        {
            key: '1',
            id: 1,
            distance: 12,
            voltage: 3.52,
            time: '28/10/2022 - 8:12:42'
        },
        {
            key: '2',
            id: 2,
            distance: 2,
            voltage: 0.32,
            time: '28/10/2022 - 8:15:30'
        },
        {
            key: '3',
            id: 3,
            distance: 22,
            voltage: 5.52,
            time: '28/10/2022 - 8:20:42'
        },
        {
            key: '4',
            id: 4,
            distance: 12,
            voltage: 3.52,
            time: '28/10/2022 - 8:42:42'
        },
        {
            key: '5',
            id: 5,
            distance: 12,
            voltage: 3.52,
            time: '28/10/2022 - 8:42:42'
        },
        {
            key: '6',
            id: 6,
            distance: 12,
            voltage: 3.52,
            time: '28/10/2022 - 8:42:42'
        },
        {
            key: '7',
            id: 7,
            distance: 12,
            voltage: 3.52,
            time: '28/10/2022 - 8:42:42'
        },
    ];
  return (
    <div>
        <Card
            title="Dữ liệu khoảng cách"
            actions={[
                <Button type="primary" onClick={() => {}}>Vẽ biểu đồ</Button>
            ]}
        >
            <Table columns={columns} dataSource={data} />
        </Card>
    </div>
  )
}
