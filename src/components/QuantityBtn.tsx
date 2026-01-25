import React from "react";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
};

const QuantityBtn: React.FC<Props> = ({ value, onChange }) => {
  const inc = () => onChange(value + 1);
  const dec = () => onChange(value > 1 ? value - 1 : 1);

  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-200 w-fit">
      <Button 
        type="text" 
        shape="circle" 
        size="small" 
        icon={<MinusOutlined className="text-xs" />} 
        onClick={dec}
        className="flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
      />
      <span className="font-semibold text-gray-800 w-6 text-center tabular-nums">{value}</span>
      <Button 
        type="text" 
        shape="circle" 
        size="small" 
        icon={<PlusOutlined className="text-xs" />} 
        onClick={inc}
        className="flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
      />
    </div>
  );
};

export default QuantityBtn;
