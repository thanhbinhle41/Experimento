import React from 'react'
import { faker } from '@faker-js/faker';
import BarChart from '../../BarChart/BarChart';
import LineChart from '../../LineChart/LineChart';
import {Card} from 'antd';

export const ChartData = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const columns = [
        {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(255, 99, 132)'
        },
        {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(75, 192, 192)'
        },
        {
        label: 'Dataset 3',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(53, 162, 235)'
        },
    ];

    const columns2 = [
        {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
        },
        {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
        },
    ];

    const options={
        isStacked: false,
        position: 'top'
    };
    return (
        <Card title="Biểu đồ">
            <LineChart
                title="Line chart data"
                labels={labels}
                columns={columns2}
                options={options}
            />
        </Card>
    )
}
