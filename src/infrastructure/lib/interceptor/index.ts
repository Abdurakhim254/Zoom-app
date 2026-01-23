import axios from 'axios';

export const axiosInterceptor = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
