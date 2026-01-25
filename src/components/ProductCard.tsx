import React from "react";
import { Button, Card, Rate, Badge } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import type { CartItem } from "../features/cart/cartSlice";

type Props = {
  item: CartItem;
  AddToCart: (item: CartItem) => void;
  priceFormatter: (price: number) => string;
};

const ProductCard: React.FC<Props> = ({ item, AddToCart, priceFormatter }) => {
  return (
    <Card
      hoverable
      className="group relative overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}
      cover={
        <div className="relative h-64 p-6 bg-gray-50 flex items-center justify-center overflow-hidden">
          {item.discountPercentage && (
             <Badge.Ribbon text={`-${Math.round(item.discountPercentage)}%`} color="#F43F5E" className="absolute top-0 right-0" />
          )}
          <img
            alt={item.title}
            src={item.thumbnail}
            className="h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
          />
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
            <Button
                shape="circle"
                size="large"
                icon={<EyeOutlined />}
                className="bg-white text-gray-700 hover:text-primary border-none shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                onClick={() => window.location.href = `/products/${item.id}`} // Using location for simplicity or could be Link wrapper
            />
            <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150"
                onClick={(e) => {
                    e.stopPropagation();
                    AddToCart(item);
                }}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-2 flex-1">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.category}</div>
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
            <Link to={`/products/${item.id}`}>{item.title}</Link>
        </h3>
        <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">{priceFormatter(item.price)}</span>
                <Rate disabled defaultValue={item.rating} allowHalf className="text-xs text-yellow-500" />
            </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
