import { createSlice } from '@reduxjs/toolkit';

const conversionsSlice = createSlice({
  name: 'conversions',
  initialState: {
    conversionInformation: {
      originalAmount: 0, // Provided by the user
      originaCurrency: '', // Provided by the user
      foreignAmount: 0, // After converting it to another currency
      foreignCurrency: '', // Oposite currency from the original
      directExchange: 0, // Converted directly to Bitcoins
      indirectExchange: 0, // Converted to another currency and then to Bitcoins
      bestDeal: {
        percentage: 0,
        type: ''
      }
    }
  },
  reducers: {
    setConversionInformation(state, action) {
      state.conversionInformation = action.payload;
    },
    setError(state, action) {
      console.log(action.payload.message);
    }
  }
});

export default conversionsSlice.reducer;

export const { setConversionInformation, setError } = conversionsSlice.actions;

const setCurrencies = originaCurrency => {
  const foreignCurrency = originaCurrency === 'eur' ? 'usd' : 'eur';
  return { originaCurrency, foreignCurrency };
};

const getDirectConversion = (blockchainData, input) => {
  const { amount, currency } = input;
  return amount / blockchainData[currency];
};

const getIndirectConversion = (blockchainData, exchangeData, input) => {
  let foreignAmount = 0;
  if (input.currency === 'eur') {
    foreignAmount = input.amount * exchangeData.eurData.usdPrice;
  } else {
    foreignAmount = input.amount * exchangeData.usdData.eurPrice;
  }
  const foreignInput = {
    amount: foreignAmount,
    currency: input.currency
  };
  const indirectExchange = getDirectConversion(blockchainData, foreignInput);
  return { indirectExchange, foreignAmount };
};

const getBestDeal = (directExchange, indirectExchange) => {
  if (directExchange > indirectExchange) {
    return {
      type: 'direct',
      percentage: (directExchange / indirectExchange) * 100 - 100
    };
  } else {
    return {
      type: 'indirect',
      percentage: (indirectExchange / directExchange) * 100 - 100
    };
  }
};

export const calculateExchange = userInput => {
  const { originaCurrency, foreignCurrency } = setCurrencies(
    userInput.currency
  );
  const originalAmount = userInput.amount;
  return async (dispatch, getState) => {
    try {
      const { blockchainData } = getState().blockchain;
      const exchangeData = getState().exchange;
      const directExchange = getDirectConversion(blockchainData, userInput);
      const { indirectExchange, foreignAmount } = getIndirectConversion(
        blockchainData,
        exchangeData,
        userInput
      );
      const bestDeal = getBestDeal(
        directExchange,
        indirectExchange,
        originaCurrency
      );
      const conversionInformation = {
        originalAmount,
        originaCurrency,
        foreignAmount,
        foreignCurrency,
        directExchange,
        indirectExchange,
        bestDeal
      };
      console.log('Data', conversionInformation);
      dispatch(setConversionInformation(conversionInformation));
    } catch (err) {
      setError(err.message);
    }
  };
};
