import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi } from '../../utils/burger-api';

type TOrderDetailsState = {
  orders: TOrder[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  orders: [],
  loading: false,
  error: null
};

export const orderDetails = createAsyncThunk(
  'orderDetails/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: initialState,
  reducers: {},
  selectors: {
    getOrderDetails(state) {
      return state.orders;
    },
    getOrderDetailsLoading(state) {
      return state.loading;
    },
    getOrderDetailsError(state) {
      return state.error;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(orderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
export const { getOrderDetails, getOrderDetailsLoading, getOrderDetailsError } =
  orderDetailsSlice.selectors;
