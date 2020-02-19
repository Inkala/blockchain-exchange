import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBlockchainData } from '../redux/features/blockchain/blockchainSlice';
import { getExchangeData } from '../redux/features/exchange/exchangeSlice';

const Layout = () => {
  const dispatch = useDispatch();

  const { blockchainData } = useSelector(state => {
    return state.blockchain;
  });

  const { usdData, eurData } = useSelector(state => {
    return state.exchange;
  });

  console.log('USD Data:\n', usdData);
  console.log('EUR Data:\n', eurData);
  console.log('Blockchain Data:\n', blockchainData);

  useEffect(() => {
    dispatch(getBlockchainData());
    dispatch(getExchangeData());
  }, [dispatch]);

  return <div>test</div>;
};

export default Layout;
