// store.ts
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, composedEnhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
