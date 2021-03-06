import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { calculateExchange } from '../../redux/features/conversions/conversionsSlice';
import classes from './SearchForm.module.scss';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    amount: 0,
    currency: 'EUR'
  });

  const handleInputChange = e => {
    const inputValue = e.target.value.replace(/^0+(?=\d)/, '');
    setInputs({
      ...inputs,
      [e.target.name]: inputValue
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInputs({ ...inputs, amount: 0 });
    dispatch(calculateExchange(inputs));
  };

  return (
    <form className={classes.searchForm} onSubmit={handleSubmit}>
      <label>I have</label>
      <input
        type="number"
        name="amount"
        onChange={handleInputChange}
        value={inputs.amount}
      />
      <select name="currency" onChange={handleInputChange}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default SearchForm;
