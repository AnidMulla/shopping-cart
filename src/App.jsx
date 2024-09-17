import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/productList";
import ProductDetailsPage from "./pages/productDetails";
import CartListPage from "./pages/cartList";
// import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/productlist" element={<ProductListPage />}></Route>
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartListPage />} />
      </Routes>
    </>
  );
}

export default App;
