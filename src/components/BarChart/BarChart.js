import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';




const BarChart = ({type, title, labels, columns, options}) => {
    // title : String
    // type :  vertical or horizontal
    // columns : [ { label: String, backgroundColor: String, data: [] }, ... ] 
    // labels = []
    /* 
    options: {
        isStacked: boolean, 
        position: String(top, right, bottom, left)
    }
    */

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    
    const optionsBarChart = {
        indexAxis: type === 'vertical' ? 'x' : 'y',
        elements: {
            bar: {
              borderWidth: 1,
            },
        },
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
        scales: { 
            x: { stacked: options?.isStacked ? options.isStacked : false}, 
            y: { stacked: options?.isStacked ? options.isStacked : false } 
        }
    };
    const dataBar = {
        labels: labels,
        datasets: columns
    };
  return (
    <>
        <Bar options={optionsBarChart} data={dataBar} redraw={true}/>
    </>
  )     
}

export default BarChart;
