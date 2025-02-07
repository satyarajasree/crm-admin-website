import React from "react";
import { Route, Routes } from "react-router-dom";
import { CrmDashboard } from "./CrmDashboard";
import { AddHolidays } from "./Holidays/AddHolidays";
import CrmLogin from "./CrmLogin";
import ListEmployees from "./employee/ListEmployees";
import { AddEmployee } from "./employee/AddEmployee";
import { EmployeePunchActivity } from "./employee/EmployeePunchActivity";
import { EmployeesPendingLeaves } from "./employee/EmployeesPendingLeaves";
import { EmployeeApprovedLeaves } from "./employee/EmployeeApprovedLeaves";
import { EmployeeRejectedLeaves } from "./employee/EmployeeRejectedLeaves";
import { EmployeeDetails } from "./employee/EmployeeDetails";
import { ListHolidays } from "./Holidays/ListHolidays";
import { EditEmployee } from "./employee/EditEmployee";
import { AddShift } from "./Shifts/AddShift";
import { ListShift } from "./Shifts/ListShift";
import { EditHoliday } from "./Holidays/EditHoliday";
import { UpdateShift } from "./Shifts/UpdateShift";
import { ChangePassword } from "./accountsettings/ChangePassword";
import { AddDepartments } from "./departments/AddDepartment";
import { ListDepartments } from "./departments/ListDepartment";
import { UpdateDepartments } from "./departments/UpdateDepartments";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import {Enquries} from "./Enquries/Enquries"
import  UpdatePunchActivity  from "./employee/UpdatePunchActivity";
import { AddBranch } from "./branch/AddBranch";
import { ListBranch } from "./branch/ListBranch";
import { UpdateBranch}  from "./branch/UpdateBranch";
import WorkReports from "./employee/WorkReports";

export const CrmApp = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<CrmDashboard />} />

            <Route path="/add-employees" element={<AddEmployee />} />
            <Route path="/list-employees" element={<ListEmployees />} />
            <Route path="/edit-employee/:empId" element={<EditEmployee />} />
            <Route
              path="/employees-pending-leaves"
              element={<EmployeesPendingLeaves />}
            />
            <Route
              path="/employees-rejected-leaves"
              element={<EmployeeRejectedLeaves />}
            />
            <Route path="/update-punch/:id" element={<UpdatePunchActivity/>} />
            <Route
              path="/employees-approved-leaves"
              element={<EmployeeApprovedLeaves />}
            />
            <Route
              path="/employees-punch-activity"
              element={<EmployeePunchActivity />}
            />
            <Route
              path="/employee-details/:empId"
              element={<EmployeeDetails />}
            />

            <Route path="/add-holiday" element={<AddHolidays />} />
            <Route path="/list-holidays" element={<ListHolidays />} />
            <Route path="/edit-holiday/:id" element={<EditHoliday />} />

            <Route path="/add-branch" element={<AddBranch />} />
            <Route path="/list-branch" element={<ListBranch />} />
            <Route path="/edit-branch/:id" element={<UpdateBranch />} />

            <Route path="/add-shift" element={<AddShift />} />
            <Route path="/list-shift" element={<ListShift />} />
            <Route path="/edit-shift/:id" element={<UpdateShift />} />

            <Route path="/add-department" element={<AddDepartments />} />
            <Route path="/list-departments" element={<ListDepartments />} />
            <Route
              path="/update-departments/:id"
              element={<UpdateDepartments />}
            />

            <Route path="/enquries" element={<Enquries />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/work-reports" element={<WorkReports/>} />
          </Route>

          <Route path="/login" element={<CrmLogin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};
