import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routers";
import BarChart from './components/BarChart/BarChart';
import { faker } from '@faker-js/faker';
import LineChart from './components/LineChart/LineChart';

function App() {

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
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
    // <div className="App">
    //   <BarChart 
    //     type="horizontal" 
    //     title="chart 1"
    //     labels={labels}
    //     columns={columns}
    //     options={options}
    //   />
    //   <LineChart
    //     title="chart 2"
    //     labels={labels}
    //     columns={columns2}
    //     options={options}
    //   />
    // </div>
  );
}

export default App;
