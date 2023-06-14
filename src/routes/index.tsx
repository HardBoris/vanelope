import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth } from "../context/UserContext";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const { token, company } = useAuth();
  return (
    <Routes>
      {company && token ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
