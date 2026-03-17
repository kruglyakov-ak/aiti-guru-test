import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/shared/types/product";

interface LocalProductsState {
  items: Product[];
}

const initialState: LocalProductsState = {
  items: [],
};

const localProductsSlice = createSlice({
  name: "localProducts",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now(), 
      };
      state.items.push(newProduct);
    },
  },
});

export const { addProduct } = localProductsSlice.actions;
export default localProductsSlice.reducer;
