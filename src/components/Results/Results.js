import React from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import classes from './Results.module.scss';

const Results = () => {
  const { conversionInformation } = useSelector(state => state.conversions);
  let conversionResults = null;

  const styleProps = useSpring({
    to: {
      opacity: conversionInformation.directExchange ? 1 : 0,
      height: conversionInformation.directExchange ? '70%' : '0%'
    },
    from: { opacity: 0, height: '0%' },
    config: { duration: 200 }
  });

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
            <animated.div className={classes.resultsModal} style={styleProps}>
              <h2>Direct conversion</h2>
              <ul>
                <li>
                  <span className={classes.number}>
                    {Number(originalAmount).toFixed(2)}
                  </span>
                  <span className={classes.smaller}> {originalCurrency}</span>
                  <span className={classes.smaller}> = </span>
                  <span className={classes.number}>
                    {Number(directExchange).toFixed(2)}
                  </span>
                  <span className={classes.smaller}> BTC</span>
                </li>
              </ul>
            </animated.div>
          </article>
          <article className={classes.inDirectConversion}>
            <animated.div className={classes.resultsModal} style={styleProps}>
              <h2>Indirect conversion</h2>
              <ul>
                <li>
                  <span className={classes.number}>
                    {Number(originalAmount).toFixed(2)}
                  </span>
                  <span className={classes.smaller}> {originalCurrency}</span>
                  <span className={classes.smaller}> = </span>
                  <span className={classes.number}>
                    {Number(foreignAmount).toFixed(2)}
                  </span>
                  <span className={classes.smaller}> {foreignCurrency}</span>
                </li>
                <li>
                  <span className={classes.number}>
                    {Number(foreignAmount).toFixed(2)}
                  </span>
                  <span className={classes.smaller}> {foreignCurrency}</span>
                  <span className={classes.smaller}> = </span>
                  <span className={classes.number}>
                    {Number(indirectExchange).toFixed(2)}
                  </span>
                  <span className={classes.smaller}> BTC</span>
                </li>
              </ul>
            </animated.div>
          </article>
        </section>
        <section className={classes.conclusion}>
          <p>
            The <span className={classes.deal}>{bestDeal.type} </span>
            conversion is better by{' '}
            <span className={classes.deal}>
              {parseFloat(Number(bestDeal.percentage).toFixed(2))}
            </span>
            %.
          </p>
        </section>
      </section>
    );
  }
  return conversionResults;
};

export default Results;
