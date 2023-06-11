import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth } from "../context/UserContext";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const { token } = useAuth();
  return (
    <Routes>
      {token ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
