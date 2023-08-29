import axios, { AxiosInstance } from 'axios';

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
    }
    return VigientClient.instance;
  }
}

export const client = VigientClient.getInstance();
