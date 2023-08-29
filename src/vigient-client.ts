import axios, { AxiosInstance } from "axios";

class VigientClient {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!VigientClient.instance) {
      VigientClient.instance = axios.create({
        baseURL: "https://api.vigient.com/",
        headers: {
          "x-api-key": process.env.VigientAPIKey,
        },
      });
    }
    return VigientClient.instance;
  }
}

export const client = VigientClient.getInstance();
