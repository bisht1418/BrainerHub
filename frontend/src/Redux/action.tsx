// actions.ts
import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";
import {
  ProductActionTypes,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SET_SEARCH,
  SET_SORT,
  SET_ORDER,
  SET_PAGE,
  SET_LIMIT,
  ADD_PRODUCT,
} from "./actionType";
import ProductForm from "../Components/ProductForm";

const baseUrl = "https://brainerhub-backend.onrender.com";

export const fetchProducts =
  (search: string, sort: string, order: string, page: number, limit: number) =>
  async (dispatch: Dispatch<ProductActionTypes>) => {
    try {
      dispatch({ type: FETCH_PRODUCTS_REQUEST });

      const response = await axios.get(
        `${baseUrl}/api/products?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`
      );

      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE });
      console.log(error);
    }
  };

export const setSearch = (search: string): ProductActionTypes => ({
  type: SET_SEARCH,
  payload: search,
});

export const setSort = (sort: string): ProductActionTypes => ({
  type: SET_SORT,
  payload: sort,
});

export const setOrder = (order: string): ProductActionTypes => ({
  type: SET_ORDER,
  payload: order,
});

export const setPage = (page: number): ProductActionTypes => ({
  type: SET_PAGE,
  payload: page,
});

export const setLimit = (limit: number): ProductActionTypes => ({
  type: SET_LIMIT,
  payload: limit,
});

export const addProduct = (
  productData: any
): ThunkAction<void, RootState, null, ProductActionTypes> => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://brainerhub-backend.onrender.com/api/products",
        productData
      );

      if (response.data) {
        dispatch({
          type: ADD_PRODUCT,
          payload: productData, // Pass the new product data to the payload
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
