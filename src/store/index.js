import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartSlice from "./features/cartSlice";
import compareSlice from "./features/compareSlice";

const persistConfig = {
  key: "product-list",
  storage,
  blacklist: [],
};
const rootReducer = combineReducers({
  cart: cartSlice,
  compare: compareSlice,
});
const middlewares = [thunkMiddleware];
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: { trace: true, traceLimit: 25 },
});
let persistor = persistStore(store);
export { persistor, store };
