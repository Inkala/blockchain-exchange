import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBlockchainData } from './redux/features/blockchain/blockchainSlice';
import { getExchangeData } from './redux/features/exchange/exchangeSlice';
import SearchForm from './components/SearchForm/SearchForm';
import classes from './App.module.scss'

const App = () => {
  const dispatch = useDispatch();

  const { blockchainData } = useSelector(state => {
    return state.blockchain;
  });

  const { usdData, eurData } = useSelector(state => {
    return state.exchange;
  });

  // console.log('USD Data:\n', usdData);
  // console.log('EUR Data:\n', eurData);
  // console.log('Blockchain Data:\n', blockchainData);

  useEffect(() => {
    dispatch(getBlockchainData());
    dispatch(getExchangeData());
  }, [dispatch]);

  return (
    <main className={classes.app}>
      <SearchForm />
    </main>
  );
};

export default App;
