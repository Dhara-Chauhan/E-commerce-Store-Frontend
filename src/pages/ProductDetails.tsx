import React, { useState, useEffect } from "react";
import { Button, Spin, Image, Divider } from "antd";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { type CartItem, addToCart } from "../features/cart/cartSlice";
import RatingStars from "../components/RatingStars";
import QuantityBtn from "../components/QuantityBtn";
import StockStatus from "../components/StockStatus";
import { useApp } from "../context/AppContext";
import api from "../services/api";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { usdToInr, products } = useApp();
  
  const [product, setProduct] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart({ ...item, quantity }));
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        // Try to find in existing products first for instant load
        const localProduct = products.find((p: any) => p.id === Number(id));
        if (localProduct) {
          setProduct(localProduct);
          setMainImage(localProduct.thumbnail);
          setLoading(false);
          return;
        }

        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.thumbnail);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProductDetails();
  }, [id, products]);

  if (loading) return <div className="flex justify-center items-center py-40"><Spin size="large" /></div>;

  if (!product)
    return <div className="text-center py-20 text-gray-500 text-lg">Product not found</div>;

  return (
    <div className="pb-10">
      <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeftOutlined /> Back to Shop
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Gallery Side */}
            <div className="p-8 bg-gray-50 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-square max-w-md mx-auto mb-6 bg-white rounded-2xl p-4 shadow-sm flex items-center justify-center">
                    <Image
                        src={mainImage}
                        alt={product.title}
                        className="object-contain w-full h-full"
                        preview={true}
                    />
                </div>
                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full max-w-md px-2">
                        {product.images.map((img: string, index: number) => (
                            <button 
                                key={index} 
                                onClick={() => setMainImage(img)}
                                className={`w-16 h-16 flex-shrink-0 border-2 rounded-lg overflow-hidden bg-white ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                            >
                                <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Details Side */}
            <div className="p-8 md:p-12 flex flex-col">
                <div className="mb-1">
                    <span className="text-sm font-medium text-primary uppercase tracking-wide bg-primary/5 px-2 py-1 rounded-md">{product.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 mt-2">{product.title}</h1>
                <RatingStars rating={product.rating} />
                
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-gray-900">{usdToInr(product.price)}</span>
                    {product.discountPercentage && (
                        <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-sm font-semibold">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                    )}
                </div>

                <StockStatus status={product.availabilityStatus} stock={product.stock} />

                <p className="text-gray-600 leading-relaxed mb-8 border-l-4 border-gray-200 pl-4">
                    {product.description}
                </p>

                <Divider />

                <div className="flex flex-col sm:flex-row gap-6 sm:items-end mt-auto">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-gray-700">Quantity</span>
                        <QuantityBtn value={quantity} onChange={setQuantity} />
                    </div>
                    
                    <Button
                        type="primary"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        disabled={!product.stock}
                        onClick={() => handleAddToCart({ ...product, quantity })}
                        className="flex-1 h-12 text-lg font-medium shadow-lg hover:shadow-primary/30 rounded-xl"
                    >
                        Add to Cart
                    </Button>
                </div>
                
                {/* Additional Info / Trust Badges */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
                    <div>
                        <span className="font-semibold text-gray-700 block mb-1">Brand</span>
                        {product.brand || "Generic"}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700 block mb-1">SKU</span>
                        {product.id}
                    </div>
                     <div>
                        <span className="font-semibold text-gray-700 block mb-1">Warranty</span>
                        {product.warrantyInformation || "Standard 1 Year"}
                    </div>
                     <div>
                         <span className="font-semibold text-gray-700 block mb-1">Returns</span>
                        {product.returnPolicy || "30 Days Return"}
                    </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;
