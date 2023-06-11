import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
// import { ListaDeCompras } from "../pages/Compra";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* <Route path="" element={<Dashboard />} /> */}
        {/* <Route path="purchases" element={<Purchases />} /> */}
        {/* <Route path="purchases/:id" element={<ListaDeCompras />} /> */}
        {/* <Route path="recipes" element={<Recipes />} /> */}
        {/* <Route path="production" element={<Production />} /> */}
      </Route>
    </Routes>
  );
};
