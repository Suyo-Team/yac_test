/**
 * Axios initial configuration:
 * 
 * We specify a base url to work with, and also a timeout for long requests
 * 
 * Code taken from:
 * https://www.willandskill.se/en/build-a-great-login-experience-with-react-native/
 */
import axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
});

// Set Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `Token ${token}`;
    return config;
  });
};


export default APIKit;