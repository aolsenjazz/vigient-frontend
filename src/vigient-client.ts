import axios, { AxiosInstance } from 'axios';
import { errorEmitter } from './events';

class VigientClient {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!VigientClient.instance) {
      VigientClient.instance = axios.create({
        baseURL:
          process.env.NODE_ENV === 'production'
            ? 'https://api.vigient.com/'
            : 'http://127.0.0.1:3000/',
        headers: {
          'x-api-key': process.env.REACT_APP_VigientAPIKey,
        },
      });

      VigientClient.instance.interceptors.response.use(
        (response) => response,
        (error) => {
          errorEmitter.emit('apiError', error.response.data.message);
          console.log(error);
          throw error;
        }
      );
    }
    return VigientClient.instance;
  }
}

export const client = VigientClient.getInstance();
