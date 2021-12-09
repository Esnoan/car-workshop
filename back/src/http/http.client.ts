import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

/**
 * HttpClient
 * @description Client to make http requests
 */
const HttpClient = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return await axios({
    method: config.method,
    url: config.url,
    data: config.data,
    params: config.params,
    headers: {
      ...config.headers,
    },
  });
};

export default HttpClient;
