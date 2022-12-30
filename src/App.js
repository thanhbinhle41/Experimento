import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routers";
import "antd/dist/antd.min.css";

function App() {
  return (
    <BrowserRouter basename="/qltnth">
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
