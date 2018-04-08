import axios from 'axios';

const config = {
  baseURL: `https://burgerbuilder-c24ed.firebaseio.com/`
};

const instance = axios.create(config);

export default instance;
