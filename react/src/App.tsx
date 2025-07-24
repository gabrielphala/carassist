import Home from "./views/base/Home"
import Terms from "./views/base/Terms"

import AdminSignIn from "./views/auth/AdminSignIn"
import EmployeeSignUp from "./views/auth/EmployeeSignUp"
import EmployeeSignIn from "./views/auth/EmployeeSignIn"
import SignIn from "./views/auth/SignIn"
import SignUp from "./views/auth/SignUp"


import UserRequests from "./views/user/Requests"
import Checkout from "./views/user/Checkout"
import DriverChat from "./views/user/Chat"
import GarageRequests from "./views/garage/Requests"
import Employees from "./views/garage/Employees"
import Services from "./views/garage/Services"
import GarageChat from "./views/garage/Chat"

import GarageEmployees from "./views/admin/Employees"
import Garages from "./views/admin/Garages"
import Requests from "./views/admin/Requests"
import AllServices from "./views/admin/Services"
import Users from "./views/admin/Users"
import Payments from "./views/admin/Payments"

import CheckoutSuccess from "./views/user/CheckoutSuccess"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CheckoutFailed from "./views/user/CheckoutFailed"

export default function App () {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/terms-and-conditions" element={<Terms />}></Route>
          <Route path="/sign-in" element={<SignIn/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
          <Route path="/u/requests" element={<UserRequests />}></Route>
          <Route path="/u/chat" element={<DriverChat />}></Route>
          <Route path="/g/chat" element={<GarageChat />}></Route>
          <Route path="/u/requests/pay" element={<Checkout />}></Route>
          <Route path="/u/requests/pay/success" element={<CheckoutSuccess />}></Route>
          <Route path="/u/requests/pay/failed" element={<CheckoutFailed/>}></Route>
          <Route path="/g/sign-up" element={<EmployeeSignUp/>}></Route>
          <Route path="/g/sign-in" element={<EmployeeSignIn/>}></Route>
          <Route path="/g/requests" element={<GarageRequests/>}></Route>
          <Route path="/g/employees" element={<Employees />}></Route>
          <Route path="/g/services" element={<Services />}></Route>
          <Route path="/a/sign-in" element={<AdminSignIn />}></Route>

          <Route path="/a/garages" element={<Garages />}></Route>
          <Route path="/a/services" element={<AllServices />}></Route>
          <Route path="/a/payments" element={<Payments />}></Route>
          <Route path="/a/users" element={<Users />}></Route>
          <Route path="/a/requests" element={<Requests />}></Route>
          <Route path="/a/employees" element={<GarageEmployees />}></Route>
        </Routes>
      </div>
    </Router>
  )
}