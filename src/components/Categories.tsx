import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCategories(data.filter((c): c is string => typeof c === "string"));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="bg-gray-700 text-white fixed top-16 z-10 w-full px-3 py-2 overflow-x-auto shadow-sm">
      <ul className="flex gap-3 flex-wrap">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className="capitalize bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-md transition"
              >
                {String(category).replace("-", " ")}
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-300 text-sm">Loading categories...</p>
        )}
      </ul>
    </div>
  );
};

export default Categories;
