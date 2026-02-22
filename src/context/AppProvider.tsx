import React, { useState, useEffect, useCallback } from "react";
import { AppContext } from "./AppContext";
import api from "../services/api";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const usdToInr = (usd: number) => {
    const rate = 88.28; // approx conversion rate
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(usd * rate);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  const fetchProducts = useCallback(async (category?: string) => {
    setLoading(true);
    try {
      const url = category ? `/products/category/${category}` : "/products";
      const response = await api.get(url);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get("/products/categories");
      // DummyJSON returns an array of objects for categories in newer versions or array of strings
      const categoryData = response.data;
      const formattedCategories = Array.isArray(categoryData) 
        ? categoryData.map(c => typeof c === 'string' ? c : c.slug || c.name) 
        : [];
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <>
      <AppContext.Provider
        value={{
          usdToInr,
          login,
          logout,
          isAuthenticated,
          products,
          categories,
          loading,
          fetchProducts,
          fetchCategories,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export default CartProvider;
