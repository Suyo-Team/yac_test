import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/v1/rest-auth/'

export const apiCall = (url, data, headers, method) => axios({
  method,
  url: baseURL + url,
  data, 
  headers
})  