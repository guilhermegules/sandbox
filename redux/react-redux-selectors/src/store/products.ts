import { createSlice } from "@reduxjs/toolkit";
import data from "../data";
import {
  Product,
  ProductReducerAction,
  ProductState,
} from "../models/product.model";

const slice = createSlice({
  name: "products",
  initialState: {
    data,
    filters: {
      colors: new Array<string>(),
      price: {
        max: 0,
        min: 0,
      },
    },
  },
  reducers: {
    changeFilters: (state: ProductState, action: ProductReducerAction) => {
      state.filters[action.payload.name] = action.payload.value;
    },
  },
});

export const selectUniqueColors = ({ products }: { products: ProductState }) =>
  Array.from(new Set(products.data.map(({ color }) => color)));

const filterColors = (colors: string[]) => (product: Product) =>
  !colors.length || colors.includes(product.color);

const filterPrice =
  (price: { min: number; max: number }) => (product: Product) =>
    (!price.max || product.price < price.max) &&
    (!price.min || product.price > price.min);

export const filterProducts = ({ products }: { products: ProductState }) => {
  const { data, filters } = products;
  return data
    .filter(filterColors(filters.colors))
    .filter(filterPrice(filters.price));
};

export const { changeFilters } = slice.actions;

export default slice.reducer;
