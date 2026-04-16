import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;