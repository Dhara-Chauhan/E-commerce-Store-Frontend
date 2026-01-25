import React from "react";
import { Tag } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type Props = {
  status: string | undefined;
  stock: number | undefined;
};

const StockStatus: React.FC<Props> = ({ status, stock }) => {
  let color = "success";
  let icon = <CheckCircleOutlined />;
  let text = status || "In Stock";
  let message = "";

  if (status === "Low Stock" || (stock && stock < 10)) {
    color = "warning";
    icon = <ExclamationCircleOutlined />;
    text = "Low Stock";
    message = `Hurry! Only ${stock} left.`;
  } else if (status === "Out of Stock" || (stock === 0)) {
    color = "error";
    icon = <CloseCircleOutlined />;
    text = "Out of Stock";
    message = "Currently unavailable.";
  }

  return (
    <div className="flex flex-col gap-1 mb-4">
      <div className="flex items-center gap-2">
           <Tag icon={icon} color={color} className="text-sm px-2 py-0.5 rounded-full font-medium border-0 bg-opacity-10">
            {text}
          </Tag>
          {message && <span className="text-xs text-red-500 font-medium">{message}</span>}
      </div>
    </div>
  );
};

export default StockStatus;
