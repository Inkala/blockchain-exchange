import { createSlice } from '@reduxjs/toolkit';

const conversionsSlice = createSlice({
  name: 'conversions',
  initialState: {
    conversionInformation: {
      originalAmount: 0, // Provided by the user
      originalCurrency: '', // Provided by the user
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

const setCurrencies = originalCurrency => {
  const foreignCurrency = originalCurrency === 'EUR' ? 'USD' : 'EUR';
  return { originalCurrency, foreignCurrency };
};

const getDirectConversion = (blockchainData, input) => {
  const { amount, currency } = input;
  return amount / blockchainData[currency];
};

const getIndirectConversion = (blockchainData, exchangeData, input) => {
  let foreignAmount = 0;
  if (input.currency === 'EUR') {
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

export const resetForm = () => {
  return dispatch => {
    dispatch(
      setConversionInformation({
        originalAmount: 0,
        originalCurrency: '',
        foreignAmount: 0,
        foreignCurrency: '',
        directExchange: 0,
        indirectExchange: 0,
        bestDeal: {
          percentage: 0,
          type: ''
        }
      })
    );
  };
};

export const calculateExchange = userInput => {
  const { originalCurrency, foreignCurrency } = setCurrencies(
    userInput.currency
  );
  const originalAmount = userInput.amount;
  return (dispatch, getState) => {
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
      originalCurrency
    );
    const conversionInformation = {
      originalAmount,
      originalCurrency,
      foreignAmount,
      foreignCurrency,
      directExchange,
      indirectExchange,
      bestDeal
    };
    dispatch(setConversionInformation(conversionInformation));
  };
};
