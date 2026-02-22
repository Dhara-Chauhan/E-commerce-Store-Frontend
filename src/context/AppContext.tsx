import { createContext, useContext } from "react";

// functions/things of cart which are use in it
export interface CartItemType {
  usdToInr: (usd: number) => string;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  products: any[];
  categories: string[];
  loading: boolean;
  fetchProducts: (category?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const AppContext = createContext<CartItemType | undefined>(undefined);

// custom hook for useContext

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw Error("useApp must be in AppProvider");
  return context;
};
