import { combineReducers } from '@reduxjs/toolkit';

import blockchain from './features/blockchain/blockchainSlice';
import exchange from './features/exchange/exchangeSlice';
import conversions from './features/conversions/conversionsSlice';

const rootReducer = combineReducers({
  blockchain,
  exchange,
  conversions
});

export default rootReducer;
