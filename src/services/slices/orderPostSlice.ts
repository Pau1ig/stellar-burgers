import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (dataOrder: string[]) => await orderBurgerApi(dataOrder)
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    resetOrder(state) {
      state.order = null;
      state.loading = false;
      state.error = null;
    }
  },
  selectors: {
    getOrder(state) {
      return state.order;
    },
    getOrderLoading(state) {
      return state.loading;
    },
    getOrderError(state) {
      return state.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { getOrder, getOrderLoading, getOrderError } =
  orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
