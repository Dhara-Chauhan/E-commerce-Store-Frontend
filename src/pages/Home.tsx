import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spin } from "antd";
import { ArrowRightOutlined, RocketOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useApp } from "../context/AppContext";

const Home: React.FC = () => {
  const { usdToInr, products, loading } = useApp();
  // Get top 8 products as featured
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl premium-gradient text-white shadow-2xl mx-auto w-full max-w-7xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="relative px-8 py-24 md:py-32 flex flex-col items-center text-center z-10">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 animate-float">
            Elevate Your <span className="text-amber-300">Style</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12 font-medium">
            Discover the latest trends in fashion, electronics, and lifestyle. Premium quality, unbeatable prices.
          </p>
          <Link to="/shop">
            <Button 
                type="default" 
                size="large" 
                shape="round" 
                className="h-16 px-12 text-lg font-bold text-primary hover:scale-105 transition-all border-none shadow-2xl flex items-center gap-2 bg-white"
            >
              Shop Now <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
          <div className="bg-white p-10 rounded-3xl classic-shadow border border-gray-50 text-center hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl group-hover:rotate-12 transition-transform">
                  <RocketOutlined />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Fast Shipping</h3>
              <p className="text-gray-500 leading-relaxed">Free delivery on all orders over $50. Track your package in real-time.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl classic-shadow border border-gray-50 text-center hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl group-hover:rotate-12 transition-transform">
                  <SafetyCertificateOutlined />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Secure Payment</h3>
              <p className="text-gray-500 leading-relaxed">100% secure payment processing. We support all major credit cards.</p>
          </div>
           <div className="bg-white p-10 rounded-3xl classic-shadow border border-gray-50 text-center hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl group-hover:rotate-12 transition-transform">
                  <CustomerServiceOutlined />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-gray-500 leading-relaxed">Our dedicated support team is here to help you around the clock.</p>
          </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Trending Now</h2>
                  <p className="text-gray-500 mt-2 text-lg font-medium">Top picks handpicked for you this week</p>
              </div>
              <Link to="/shop" className="text-primary font-bold hover:text-primary-hover flex items-center gap-2 group text-lg">
                Explore Full Catalog <ArrowRightOutlined className="group-hover:translate-x-2 transition-transform" />
              </Link>
          </div>
          
          {loading ? (
              <div className="flex justify-center py-32"><Spin size="large" /></div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredProducts.map(product => (
                      <Link key={product.id} to={`/products/${product.id}`} className="block h-full">
                          <Card 
                            hoverable
                            className="h-full rounded-3xl border border-gray-100 classic-shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
                            styles={{ body: { padding: '20px' } }}
                            cover={
                                <div className="h-64 p-8 bg-gray-50 flex items-center justify-center overflow-hidden">
                                     <img alt={product.title} src={product.thumbnail} className="h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply" />
                                </div>
                            }
                          >
                              <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category.replace(/-/g, " ")}</span>
                                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">{product.title}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xl font-black text-gray-900">{usdToInr(product.price)}</span>
                                    <ArrowRightOutlined className="text-gray-300 group-hover:text-primary transition-colors" />
                                </div>
                              </div>
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
