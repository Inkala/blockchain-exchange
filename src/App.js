import React from 'react';

import SearchForm from './components/SearchForm/SearchForm';
import ExchngeRates from './components/ExchngeRates/ExchngeRates';
import classes from './App.module.scss';

const App = () => {
  return (
    <main className={classes.app}>
      <ExchngeRates />
      <SearchForm />
    </main>
  );
};

export default App;
