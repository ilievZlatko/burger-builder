import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-burger.firebaseio.com'
});

export default instance;