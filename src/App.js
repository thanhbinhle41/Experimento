import "./App.css";
// import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routers";
import "antd/dist/antd.css";

import { HashRouter } from 'react-router-dom'

function App() {
  

  return (
    <HashRouter>
      <AppRoute />
    </HashRouter>
  );
}

export default App;
