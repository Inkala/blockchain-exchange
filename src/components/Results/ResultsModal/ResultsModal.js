import React from 'react';
import { animated } from 'react-spring';

import classes from './ResultsModal.module.scss';

const ResultsModal = ({ info, type, styleProps }) => {
  const {
    originalAmount,
    originalCurrency,
    foreignAmount,
    foreignCurrency,
    directExchange,
    indirectExchange
  } = info;
  return (
    <article className={classes.resultsModal}>
      <animated.div className={classes.results} style={styleProps}>
        <h2>
          {type === 'direct' ? 'Direct conversion' : 'Indirect conversion'}
        </h2>
        {type === 'direct' ? (
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
        ) : (
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
        )}
      </animated.div>
    </article>
  );
};

export default ResultsModal;
