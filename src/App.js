import React from 'react';

import SearchForm from './components/SearchForm/SearchForm';
import ExchngeRates from './components/ExchngeRates/ExchngeRates';
import classes from './App.module.scss';
import Results from './components/Results/Results';

const App = () => {
  return (
    <main className={classes.app}>
      <ExchngeRates />
      <SearchForm />
      <Results />
    </main>
  );
};

export default App;
