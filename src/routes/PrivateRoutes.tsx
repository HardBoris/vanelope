import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Purchases } from "../pages/Purchases";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/:companyId" element={<Dashboard />} />
      <Route path="/:companyId/purchases" element={<Purchases />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
