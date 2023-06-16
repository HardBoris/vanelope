import { Route, Routes } from "react-router-dom";
// import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { useAuth } from "../context/UserContext";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Purchases } from "../pages/Purchases";
// import { ListaDeCompras } from "../pages/Compra";

export const PrivateRoutes = () => {
  const { company } = useAuth();
  return (
    <Routes>
      <Route path={`/${company}`} element={<Dashboard />} />
      <Route path={`/${company}/purchases`} element={<Purchases />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
