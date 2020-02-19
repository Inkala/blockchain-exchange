import { combineReducers } from "@reduxjs/toolkit"

import blockchain from "./features/blockchain/blockchainSlice"
import exchange from "./features/exchange/exchangeSlice"

const rootReducer = combineReducers({
  blockchain,
  exchange
})

export default rootReducer
