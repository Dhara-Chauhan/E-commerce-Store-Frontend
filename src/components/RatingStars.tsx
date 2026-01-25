import React from "react";
import { Rate } from "antd";

type Props = {
  rating: number;
  max?: number;
};

const RatingStars: React.FC<Props> = ({ rating }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Rate disabled allowHalf defaultValue={rating} className="text-yellow-500 text-sm" />
      <span className="text-sm text-gray-500 font-medium">({rating})</span>
    </div>
  );
};

export default RatingStars;
