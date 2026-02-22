import React from "react";
import { Button, Card, Rate, Badge } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined, ArrowRightOutlined } from "@ant-design/icons";
import type { CartItem } from "../features/cart/cartSlice";

type Props = {
  item: CartItem;
  AddToCart: (item: CartItem) => void;
  priceFormatter: (price: number) => string;
};

const ProductCard: React.FC<Props> = ({ item, AddToCart, priceFormatter }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="group bg-white rounded-3xl border border-gray-100 classic-shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col"
      styles={{ body: { padding: "20px", flex: 1, display: "flex", flexDirection: "column" } }}
      cover={
        <div className="relative h-72 bg-gray-50 flex items-center justify-center overflow-hidden p-8">
          {item.discountPercentage && (
             <div className="absolute top-4 left-4 z-10 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                -{Math.round(item.discountPercentage)}% Off
             </div>
          )}
          <img
            alt={item.title}
            src={item.thumbnail}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
          />
          
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-[2px] flex justify-center gap-3">
            <Button
                shape="circle"
                size="large"
                icon={<EyeOutlined />}
                className="bg-white/90 border-none shadow-xl hover:scale-110 transition-transform"
                onClick={() => navigate(`/products/${item.id}`)}
            />
            <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="shadow-xl hover:scale-110 transition-transform premium-gradient border-none"
                onClick={(e) => {
                    e.stopPropagation();
                    AddToCart(item);
                }}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-1 rounded-md">
            {item.category.replace(/-/g, " ")}
          </span>
          <div className="flex items-center gap-1">
            <Rate disabled defaultValue={item.rating} allowHalf className="text-[10px] text-amber-400" />
            <span className="text-[10px] text-gray-400 font-medium">({item.rating})</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors h-12">
            <Link to={`/products/${item.id}`}>{item.title}</Link>
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
            <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 leading-none">{priceFormatter(item.price)}</span>
                <span className="text-[10px] text-gray-400 mt-1">MRP incl. taxes</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowRightOutlined className="text-xs text-gray-400 group-hover:text-primary transition-colors" />
            </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
