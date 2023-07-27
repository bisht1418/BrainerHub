// actionTypes.ts
import ProductForm from "../Components/ProductForm";
import Product from "../Pages/Product";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const SET_SEARCH = "SET_SEARCH";
export const SET_SORT = "SET_SORT";
export const SET_ORDER = "SET_ORDER";
export const SET_PAGE = "SET_PAGE";
export const SET_LIMIT = "SET_LIMIT";
export const ADD_PRODUCT = "ADD_PRODUCT";

interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
}

interface SetSearchAction {
  type: typeof SET_SEARCH;
  payload: string;
}

interface SetSortAction {
  type: typeof SET_SORT;
  payload: string;
}

interface SetOrderAction {
  type: typeof SET_ORDER;
  payload: string;
}

interface SetPageAction {
  type: typeof SET_PAGE;
  payload: number;
}

interface SetLimitAction {
  type: typeof SET_LIMIT;
  payload: number;
}

interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

export interface RootState {
  product: any;
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | SetSearchAction
  | SetSortAction
  | SetOrderAction
  | SetPageAction
  | AddProductAction
  | SetLimitAction;
