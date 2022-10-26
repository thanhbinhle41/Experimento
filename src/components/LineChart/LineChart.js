import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const  LineChart = ({title, labels, columns, options}) => {
    // title : String
    // columns : [ { label: String, backgroundColor: String, data: [] }, ... ] 
    // labels = []
    /* 
    options: {
        position: String(top, right, bottom, left)
    }
    */

    const optionsBarChart = {
        responsive: true,
        plugins: {
            legend: {
                position: options?.position ? options.position : 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    const dataBar = {
        labels: labels,
        datasets: columns
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    return (
        <>
            <Line options={optionsBarChart} data={dataBar} redraw={true}/>
        </>
    )
}

export default LineChart;
