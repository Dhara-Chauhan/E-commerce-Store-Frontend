import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spin } from "antd";
import { ArrowRightOutlined, RocketOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useApp } from "../context/AppContext";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

const Home: React.FC = () => {
  const { usdToInr } = useApp();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
        try {
            const res = await fetch('https://dummyjson.com/products?limit=4&skip=10');
            const data = await res.json();
            setFeaturedProducts(data.products);
        } catch (error) {
            console.error("Error fetching featured products", error);
        } finally {
            setLoading(false);
        }
    }
    fetchFeatured();
  }, [])

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 text-white shadow-2xl mx-auto w-full max-w-7xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center" />
        <div className="relative px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Elevate Your Style
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 animate-fade-in-up delay-100">
            Discover the latest trends in fashion, electronics, and lifestyle. Premium quality, unbeatable prices.
          </p>
          <Link to="/shop">
            <Button 
                type="default" 
                size="large" 
                shape="round" 
                className="h-14 px-10 text-lg font-bold text-primary hover:scale-105 transition-transform border-none shadow-lg items-center flex gap-2"
            >
              Shop Now <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  <RocketOutlined />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-500">Free delivery on all orders over $50. Track your package in real-time.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  <SafetyCertificateOutlined />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-500">100% secure payment processing. We support all major credit cards.</p>
          </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  <CustomerServiceOutlined />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-500">Our dedicated support team is here to help you around the clock.</p>
          </div>
      </section>

      {/* Featured Products */}
      <section>
          <div className="flex justify-between items-end mb-8 px-4">
              <div>
                  <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                  <p className="text-gray-500 mt-2">Top picks this week</p>
              </div>
              <Link to="/shop" className="text-primary font-medium hover:text-primary-hover flex items-center gap-1">View all <ArrowRightOutlined /></Link>
          </div>
          
          {loading ? (
              <div className="flex justify-center py-20"><Spin size="large" /></div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                  {featuredProducts.map(product => (
                      <Link key={product.id} to={`/products/${product.id}`}>
                          <Card 
                            hoverable
                            className="h-full overflow-hidden border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            cover={
                                <div className="h-64 p-6 bg-gray-50 flex items-center justify-center overflow-hidden">
                                     <img alt={product.title} src={product.thumbnail} className="h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            }
                          >
                              <Card.Meta title={product.title} description={<span className="text-lg font-bold text-primary">{usdToInr(product.price)}</span>} />
                          </Card>
                      </Link>
                  ))}
              </div>
          )}
      </section>
    </div>
  );
};

export default Home;
