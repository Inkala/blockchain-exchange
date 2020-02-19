import { createSlice } from '@reduxjs/toolkit';

import axios from './blockchainService';

const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState: {
    blockchainData: {}
  },
  reducers: {
    populateBlockchainData(state, action) {
      state.blockchainData = action.payload;
    },
    apiError(state, action) {
      const { message } = action.payload;
      alert(message);
    }
  }
});

export default blockchainSlice.reducer;

export const { populateBlockchainData, apiError } = blockchainSlice.actions;

export const getBlockchainData = () => {
  return async dispatch => {
    try {
      const apiResponse = await axios.get('/ticker');
      const blockchainData = {
        USD: apiResponse.data.USD.last,
        EUR: apiResponse.data.EUR.last
      }
      dispatch(populateBlockchainData(blockchainData));
    } catch (err) {
      apiError(err.message);
    }
  };
};
