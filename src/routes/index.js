import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartDetail from "../pages/Cart/CartDetail";
import CompareList from "../pages/Compare/CompareList";
import ProductList from "../pages/Product/ProductList";
import PublicRoute from "./PublicRoute";

const PagesRoutes = () => {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/cart" element={<CartDetail />} />
          <Route exact path="/compare" element={<CompareList />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default PagesRoutes;
