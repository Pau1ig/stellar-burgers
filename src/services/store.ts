import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { feedReducer } from './slices/feedSlice';
import { orderReducer } from './slices/orderPostSlice';
import { ordersReducer } from './slices/ordersGetSlice';
import { userAuthReducer } from './slices/userAuthSlice';
import { ingredientsReducer } from './slices/ingredientSlice';
import { orderDetailsReducer } from './slices/orderDetailsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';

// Заменить на импорт настоящего редьюсера

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  order: orderReducer,
  orders: ordersReducer,
  orderDetails: orderDetailsReducer,
  userAuth: userAuthReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
