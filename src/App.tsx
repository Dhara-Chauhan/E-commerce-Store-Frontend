import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import LayoutWrapper from "./components/LayoutWrapper";
import Profile from "./components/Profile";

function App() {
  return (
      <Router>
        <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <LayoutWrapper>
                  <Home />
                </LayoutWrapper>
              }
            />
            <Route
              path="/shop"
              element={
                <LayoutWrapper>
                  <Products />
                </LayoutWrapper>
              }
            />
            <Route
              path="/cart"
              element={
                <LayoutWrapper>
                  <Cart />
                </LayoutWrapper>
              }
            />
            <Route
              path="/products/:id"
              element={
                <LayoutWrapper>
                  <ProductDetails />
                </LayoutWrapper>
              }
            />
            <Route
                path="/category/:slug"
                element={
                    <LayoutWrapper>
                        <Products />
                    </LayoutWrapper>
                }
            />
            <Route
              path="/login"
              element={
                <LayoutWrapper>
                  <Login />
                </LayoutWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <LayoutWrapper>
                  <Profile />
                </LayoutWrapper>
              }
            />
          </Routes>
      </Router>
  );
}

export default App;
