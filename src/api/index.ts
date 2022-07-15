import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
const Axios = axios.create({
  headers: {
    Authorization: `Bearer ${token ?? 'NOT_FOUND_TOKEN'}`
  }
});

export default Axios;
