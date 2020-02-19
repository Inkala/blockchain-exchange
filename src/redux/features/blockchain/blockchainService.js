import axios from 'axios';

const blockchainService = axios.create({
  baseURL: 'https://blockchain.info'
});

export default blockchainService;
