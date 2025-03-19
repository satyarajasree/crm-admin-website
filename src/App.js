import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CrmApp } from "./CRM Dashboard/CrmApp";
import Home from "./MainWebsite/Home"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import AddEmployee from "./AddEmployee";
import EmployeeTreeView from "./EmployeeTreeView";
import CustomerForm from "./CustomerForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<CrmApp />} path="/*" />
          <Route element={<Home />} path="/" />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
