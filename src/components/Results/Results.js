import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSpring } from 'react-spring';

import ResultsModal from './ResultsModal/ResultsModal';
import { resetForm } from '../../redux/features/conversions/conversionsSlice';
import classes from './Results.module.scss';

const Results = () => {
  const dispatch = useDispatch();
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

  const handleReset = () => {
    dispatch(resetForm());
  };

  if (conversionInformation.directExchange) {
    const { bestDeal } = conversionInformation;
    conversionResults = (
      <section className={classes.results}>
        <section className={classes.resultsWrapper}>
          <ResultsModal
            type="direct"
            info={conversionInformation}
            styleProps={styleProps}
          />
          <ResultsModal
            type="indirect"
            info={conversionInformation}
            styleProps={styleProps}
          />
        </section>
        <section className={classes.conclusion}>
          <p>
            The <span className={classes.deal}>{bestDeal.type} </span>
            conversion is better by <span className={classes.deal}>
            {parseFloat(Number(bestDeal.percentage).toFixed(2))}
            </span>
            %.
          </p>
          <button className={classes.resetButton} onClick={handleReset}>
            Reset
          </button>
        </section>
      </section>
    );
  }
  return conversionResults;
};

export default Results;
