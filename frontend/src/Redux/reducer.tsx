// reducer.ts
import { combineReducers } from "redux";
import { ProductActionTypes, ADD_PRODUCT } from "./actionType";
import Product from "../Pages/Product"; // Assuming this interface is defined in ProductList.tsx

interface ProductState {
  products: Product[];
  loading: boolean;
  search: string;
  sort: string;
  order: string;
  page: number;
  limit: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  search: "",
  sort: "",
  order: "asc",
  page: 1,
  limit: 10,
};

const productReducer = (
  state: ProductState = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_ORDER":
      return { ...state, order: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "ADD_PRODUCT":
      // Add the new product to the state
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

export default combineReducers({
  product: productReducer,
});
