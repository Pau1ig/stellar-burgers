import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

type TOrdersGetState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const initialState: TOrdersGetState = {
  orders: [],
  loading: false,
  error: null
};

export const getOrdersUser = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  selectors: {
    getOrders(state) {
      return state.orders;
    },
    getOrdersLoading(state) {
      return state.loading;
    },
    getOrdersError(state) {
      return state.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const { getOrders, getOrdersLoading, getOrdersError } =
  ordersSlice.selectors;
