import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Scatter } from "react-chartjs-2";

const StudentChart = (props) => {
  const { dataTable } = props;
  // Get array of distances
  const labels = dataTable.map((data) => data.distance);

  const columns = [
    {
      label: "Biểu đồ điện áp",
      // Get array of voltage
      data: dataTable.map((data) => data.voltage),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      fill: false,
      showLine: true,
    },
  ];

  const options = {
    // isStacked: false,
    // position: "top",

    scales: {
      x: {
        title: {
          display: true,
          text: "Khoảng cách",
        },
        min: 0,
        max: 30,
        ticks: {
          // forces step size to be 50 units
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        title: {
          display: true,
          text: "Điện áp",
        },
      },
    },
  };

  const dataBar = {
    labels: labels,
    datasets: columns,
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
  return <Scatter title="Dữ liệu đo được" data={dataBar} options={options} />;
};

export default StudentChart;
