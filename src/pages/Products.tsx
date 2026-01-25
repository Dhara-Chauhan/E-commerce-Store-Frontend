import React, { useState, useEffect } from "react";
import { Spin, Empty } from "antd";
import { useApp } from "../context/AppContext";
import { type CartItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import ProductCard from "../components/ProductCard";

const Products: React.FC = () => {
  const { usdToInr } = useApp();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-2">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop All Products</h1>
            <p className="text-gray-500 mt-1">Showing {products.length} results</p>
        </div>
        {/* Future: Add Filters/Sort here */}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Loading products..." />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              AddToCart={handleAddToCart}
              priceFormatter={usdToInr}
            />
          ))}
        </div>
      ) : (
          <Empty description="No products found" className="py-20" />
      )}
    </div>
  );
};

export default Products;
