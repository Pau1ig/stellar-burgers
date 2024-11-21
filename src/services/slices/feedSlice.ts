import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TFeedSliceState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedSliceState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {},
  selectors: {
    getFeedOrders(state) {
      return state.orders;
    },
    getFeedTotal(state) {
      return state.total;
    },
    getFeedTotalToday(state) {
      return state.totalToday;
    },
    getFeedLoading(state) {
      return state.loading;
    },
    getFeedError(state) {
      return state.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
  getFeedLoading,
  getFeedError
} = feedSlice.selectors;
