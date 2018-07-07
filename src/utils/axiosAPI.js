import axios from 'axios';

const config = {
  baseURL: `https://burger-builder-53cff.firebaseio.com/`
};

const instance = axios.create(config);

export default instance;
