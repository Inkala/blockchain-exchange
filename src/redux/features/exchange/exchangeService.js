import axios from 'axios';

const exchangeService = axios.create({
  baseURL: 'https://api.exchangeratesapi.io'
});

export default exchangeService;
