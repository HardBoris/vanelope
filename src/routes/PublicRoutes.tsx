import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
// import { Landing } from "../pages/Landing";
// import { Production } from "../pages/Production";
// import { Recipes } from "../pages/Recipes";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/" element={<Landing />} /> */}
      {/* <Route path="purchases" element={<Purchases />} /> */}
      {/* <Route path="recipes" element={<Recipes />} /> */}
      {/* <Route path="production" element={<Production />} /> */}
      {/* </Route> */}
    </Routes>
  );
};
