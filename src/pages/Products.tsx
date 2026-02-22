import React from "react";
import { Spin, Empty, Breadcrumb } from "antd";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { type CartItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import ProductCard from "../components/ProductCard";

const Products: React.FC = () => {
  const { slug } = useParams();
  const { usdToInr, products, loading, fetchProducts } = useApp();
  const dispatch = useDispatch();

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    fetchProducts(slug);
  }, [slug, fetchProducts]);

  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ") : "All Products";

  return (
    <div className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <Breadcrumb 
          items={[
            { title: <Link to="/">Home</Link> },
            { title: <Link to="/shop">Shop</Link> },
            slug ? { title: categoryName } : null
          ].filter(Boolean) as any} 
          className="mb-6"
        />
        
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-500 font-medium">
              Discover our curated collection of {products.length} products.
            </p>
          </div>
          {/* Filters can be added here later */}
        </div>
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
