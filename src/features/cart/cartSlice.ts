import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
// api datatype for value
export interface CartItem {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  quantity: number;
  images?: string[];
  thumbnail: string;
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  tags?: string[];
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }[];
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  warrantyInformation?: string;
}

// functions/things of cart which are use in it
export interface CartItemTypeState {
  cart: CartItem[];
}

// Define the initial state using that type
const initialState: CartItemTypeState = {
  cart: [],
  
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.cart.find((item)=> item.id ===action.payload.id);
       if (existingItem) {
    existingItem.quantity += action.payload.quantity || 1;
  } else {
    state.cart.push({
      ...action.payload,
      quantity: action.payload.quantity || 1,
    });
  }
    },
    removeFromCart:(state, action:PayloadAction<CartItem>) =>{
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      state.cart.find(item => item.id === action.payload.id);
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      } else {
        state.cart = state.cart.filter((item) => item.id !== id);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer