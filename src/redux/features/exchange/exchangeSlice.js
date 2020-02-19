import { createSlice } from '@reduxjs/toolkit';

import axios from './exchangeService';

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    usdData: {},
    eurData: {}
  },
  reducers: {
    populateExchangeData(state, action) {
      state.usdData = action.payload.usdData;
      state.eurData = action.payload.eurData;
    },
    apiError(state, action) {
      const { message } = action.payload;
      alert(message);
    }
  }
});

export default exchangeSlice.reducer;

export const { populateExchangeData, apiError } = exchangeSlice.actions;

export const getExchangeData = () => {
  return async dispatch => {
    try {
      const usdResponse = await axios.get('/latest?base=USD');
      const eurResponse = await axios.get('/latest?base=EUR');
      const usdData = {
        base: usdResponse.data.base,
        eurPrice: usdResponse.data.rates.EUR
      }
      const eurData = {
        base: eurResponse.data.base,
        usdPrice: eurResponse.data.rates.USD
      }
      dispatch(populateExchangeData({usdData, eurData}));
    } catch (err) {
      apiError(err.message);
    }
  };
};
