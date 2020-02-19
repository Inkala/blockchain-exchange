import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBlockchainData } from '../../redux/features/blockchain/blockchainSlice';
import { getExchangeData } from '../../redux/features/exchange/exchangeSlice';
import classes from './ExchngeRates.module.scss';

const ExchngeRates = () => {
  const dispatch = useDispatch();
  const { blockchainData } = useSelector(state => state.blockchain);
  const { usdData, eurData } = useSelector(state => state.exchange);

  useEffect(() => {
    dispatch(getBlockchainData());
    dispatch(getExchangeData());
  }, [dispatch]);

  return (
    <header className={classes.exchangeRates}>
      {eurData.usdPrice && blockchainData.eur ? (
        <section className={classes.ratesWrapper}>
          <p>
            <b>EUR:</b> ${eurData.usdPrice.toFixed(2)} USD
          </p>
          <p>
            <b>USD:</b> {usdData.eurPrice.toFixed(2)}€ EUR
          </p>
          <p>
            <b>BTC: </b>
            {blockchainData.eur.toFixed(2)}€ EUR
            <b> | </b>${blockchainData.usd.toFixed(2)} USD
          </p>
        </section>
      ) : null}
    </header>
  );
};

export default ExchngeRates;
