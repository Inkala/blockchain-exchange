import React from 'react';
import { useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import classes from './Results.module.scss';

const Results = () => {
  const { conversionInformation } = useSelector(state => state.conversions);
  let conversionResults = null;
  if (conversionInformation.directExchange) {
    const {
      originalAmount,
      originalCurrency,
      foreignAmount,
      foreignCurrency,
      directExchange,
      indirectExchange,
      bestDeal
    } = conversionInformation;
    conversionResults = (
      <section className={classes.results}>
        <section className={classes.resultsWrapper}>
          <article className={classes.directConversion}>
            <h2>Direct conversion</h2>
            <ul>
              <li>
                <span className={classes.number}>{Number(originalAmount).toFixed(2)}</span>
                <span className={classes.currency}> {originalCurrency}</span>
                <span> = </span>
                <span className={classes.number}>{Number(directExchange).toFixed(2)}</span>
                <span className={classes.currency}> BTC</span>
              </li>
            </ul>
          </article>
          <article className={classes.inDirectConversion}>
            <h2>Indirect conversion</h2>
            <ul>
              <li>
                <span className={classes.number}>{Number(originalAmount).toFixed(2)}</span>
                <span className={classes.currency}> {originalCurrency}</span>
                <span> = </span>
                <span className={classes.number}>{Number(foreignAmount).toFixed(2)}</span>
                <span className={classes.currency}> {foreignCurrency}</span>
              </li>
              <li>
                <span className={classes.number}>{Number(foreignAmount).toFixed(2)}</span>
                <span className={classes.currency}> {foreignCurrency}</span>
                <span> = </span>
                <span className={classes.number}>{Number(indirectExchange).toFixed(2)}</span>
                <span className={classes.currency}> BTC</span>
              </li>
            </ul>
          </article>
        </section>
        <section className={classes.conclusion}>
          <p>
            The <span className={classes.dealType}>{bestDeal.type} </span>
            conversion is better by{' '}
            <span className={classes.dealPercent}>{Number(indirectExchange).toFixed(2)}</span>%.
          </p>
        </section>
      </section>
    );
  }
  return conversionResults;
};

export default Results;
