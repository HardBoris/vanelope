import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Purchases } from "../pages/Purchases";
import { Movements } from "../pages/Movements";
import { Requisition } from "../pages/Requisition";
import { Requisa } from "../pages/Requisition/Requisa/Requisa";
import { ToolReq } from "../pages/Requisition/ToolReq";
import { MaterialReq } from "../pages/Requisition/MatReq";
import { Entry } from "../pages/Entry";
import { Entries } from "../pages/Entry/Entries/Entry";
import { ToolEntry } from "../pages/Entry/ToolEntry";
import { MaterialEntry } from "../pages/Entry/MatEntry";
import { NewPurchase } from "../pages/Purchases/NewPurchase";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/:companyId" element={<Dashboard />} />
      <Route path="/:companyId/movements" element={<Movements />} />
      <Route path="/:companyId/purchases" element={<Purchases />}>
        <Route path="" element={<Requisa />} />
        <Route path="newpurchase" element={<NewPurchase />} />
      </Route>
      <Route path="/:companyId/requisitions" element={<Requisition />}>
        <Route path="" element={<Requisa />} />
        <Route path="toolreq" element={<ToolReq />} />
        <Route path="materialreq" element={<MaterialReq />} />
      </Route>
      <Route path="/:companyId/entries" element={<Entry />}>
        <Route path="" element={<Entries />} />
        <Route path="toolentry" element={<ToolEntry />} />
        <Route path="materialentry" element={<MaterialEntry />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
