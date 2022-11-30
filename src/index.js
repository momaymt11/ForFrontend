import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home_page from "./pages/home_page";
import Login_page from "./pages/login_page";
import Admin_page from "./pages/admin_page";
import User_make_an_appointment from "./pages/user_make_an_appointment";
import Doctor_page from "./pages/doctor_page";
import Mentalhealth_test_page from "./pages/mentalhealth_test_page";
import Satisfaction_form from "./pages/satisfaction_form";
import Provider_visits_appointments from "./pages/provider_visits_appointments";
import User_account_settings from "./pages/user_account_settings";
import Provider_account_settings from "./pages/provider_account_settings";
import User_my_appointment_book from "./pages/user_my_appointment_book";
import Provider_talk_page from "./pages/provider_talk_page";
import User_talk_page from "./pages/user_talk_page";
import Mentalhealth_result from "./pages/mentalhealth_result";
import Provider_result_mental from "./pages/provider_result_mental";
import Admin_user_management from "./pages/admin_user_management";
import Admin_psychiatrist_management from "./pages/admin_psychiatrist_management";
import Admin_mental_health_management from "./pages/admin_mental_health_management";
import Admin_satisfaction_management from "./pages/admin_satisfaction_management";
import Satisfaction_result from "./pages/satisfaction_result";
import Admin_satisfaction_result from "./pages/admin_satisfaction_result";

const root = ReactDOM.createRoot(document.getElementById("root"));

function RequireAuthUser({ children, redirectTo }) {
  const saved = localStorage.getItem("u_role");
  let isAuthenticated = saved;
  return isAuthenticated == "user" ? children : <Navigate to={redirectTo} />;
}

function RequireAuthPsy({ children, redirectTo }) {
  const saved = localStorage.getItem("psy_role");
  let isAuthenticated = saved;
  return isAuthenticated == "psy" ? children : <Navigate to={redirectTo} />;
}
function RequireAuthAdmin({ children, redirectTo }) {
  const saved = localStorage.getItem("admin_role");
  let isAuthenticated = saved;
  return isAuthenticated == "admin" ? children : <Navigate to={redirectTo} />;
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home_page />} />
      <Route path="/login" element={<Login_page />} />
      <Route path="/satisfaction_form" element={<Satisfaction_form />} />
      <Route path="/satisfaction_result" element={<Satisfaction_result />} />
      <Route path="/mentalhealth_test" element={<Mentalhealth_test_page />} />
      <Route path="/mentalhealth_result" element={<Mentalhealth_result />} />

      <Route
        path="/user_make_an_appointment"
        element={
          <RequireAuthUser redirectTo="/">
            <User_make_an_appointment />
          </RequireAuthUser>
        }
      />
      <Route
        path="/user_my_appointment_book"
        element={
          <RequireAuthUser redirectTo="/">
            <User_my_appointment_book />
          </RequireAuthUser>
        }
      />
      <Route
        path="/user_account_settings"
        element={
          <RequireAuthUser redirectTo="/">
            <User_account_settings />
          </RequireAuthUser>
        }
      />
      <Route
        path="/user_talk_page/:id"
        element={
          <RequireAuthUser redirectTo="/">
            <User_talk_page />
          </RequireAuthUser>
        }
      />

      <Route
        path="/provider_visits_appointments"
        element={
          <RequireAuthPsy redirectTo="/">
            <Provider_visits_appointments />
          </RequireAuthPsy>
        }
      />
      <Route
        path="/provider_result_mental"
        element={
          <RequireAuthPsy redirectTo="/">
            <Provider_result_mental />
          </RequireAuthPsy>
        }
      />

      <Route
        path="/provider_account_settings"
        element={
          <RequireAuthPsy redirectTo="/">
            <Provider_account_settings />
          </RequireAuthPsy>
        }
      />

      <Route
        path="/provider_talk_page/:id"
        element={
          <RequireAuthPsy redirectTo="/">
            <Provider_talk_page />
          </RequireAuthPsy>
        }
      />

      <Route
        path="/admin_user_management"
        element={
          <RequireAuthAdmin redirectTo="/">
            <Admin_user_management />
          </RequireAuthAdmin>
        }
      />
      <Route
        path="/admin_psychiatrist_management"
        element={
          <RequireAuthAdmin redirectTo="/">
            <Admin_psychiatrist_management />
          </RequireAuthAdmin>
        }
      />
      <Route
        path="/admin_mental_health_management"
        element={
          <RequireAuthAdmin redirectTo="/">
            <Admin_mental_health_management />
          </RequireAuthAdmin>
        }
      />
      <Route
        path="/admin_satisfaction_management"
        element={
          <RequireAuthAdmin redirectTo="/">
            <Admin_satisfaction_management />
          </RequireAuthAdmin>
        }
      />

      <Route
        path="/admin_satisfaction_result"
        element={
          <RequireAuthAdmin redirectTo="/">
            <Admin_satisfaction_result />
          </RequireAuthAdmin>
        }
      />

      <Route path="/admin" element={<Admin_page />} />
      <Route path="/doctor" element={<Doctor_page />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
