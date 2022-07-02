import axios from 'axios';

const Axios = axios.create({
  headers: {
    authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''}`
  }
});

export default Axios;
