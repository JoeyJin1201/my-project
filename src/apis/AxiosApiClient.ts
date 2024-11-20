/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import AppConfig from '@/config';

import { useMessage } from '@/hooks';

const message = useMessage();

const API_CONFIG = {
  baseURL: AppConfig.serverUrl,
  timeout: 600000,
};

class AxiosApiClient {
  axiosInstance: any;

  constructor(apiConfig?: any) {
    this.axiosInstance = axios.create({ ...API_CONFIG, ...apiConfig });
  }

  setHeader(headerObject = null, request_id: string) {
    const token =
      sessionStorage.getItem('access_token') ||
      localStorage.getItem('access_token');

    const defaultHeaders = {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Security-Policy': 'upgrade-insecure-requests',
      request_id,
    };

    this.axiosInstance.defaults.headers = {
      ...defaultHeaders,
      ...(headerObject || {}),
    };
  }

  instance() {
    return this.axiosInstance;
  }

  get({
    url,
    payload,
    config,
    showError = true,
  }: {
    url: string;
    payload: any;
    config: any;
    showError?: boolean;
  }) {
    const request_id = uuidv4();
    this.setHeader(config.header, request_id);
    const source = axios.CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .get(url, {
            params: { ...payload },
            ...config,
            cancelToken: source.token,
          })
          .then((res: any) => ({ ...res, request_id }))
          .catch((err: any) => this.onError({ ...err, request_id }, showError)),
      cancel: source.cancel,
    };
  }

  post({
    url,
    payload,
    config,
    showError = true,
  }: {
    url: string;
    payload: any;
    config: any;
    showError?: boolean;
  }) {
    const request_id = uuidv4();
    this.setHeader(config.header, request_id);
    const source = axios.CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .post(url, payload, { ...config, cancelToken: source.token })
          .then((res: any) => ({ ...res, request_id }))
          .catch((err: any) => this.onError({ ...err, request_id }, showError)),
      cancel: source.cancel,
    };
  }

  delete({
    url,
    config,
    showError = true,
  }: {
    url: string;
    config: any;
    showError?: boolean;
  }) {
    const request_id = uuidv4();
    this.setHeader(config.header, request_id);
    const source = axios.CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .delete(url, { ...config, cancelToken: source.token })
          .then((res: any) => ({ ...res, request_id }))
          .catch((err: any) => this.onError({ ...err, request_id }, showError)),
      cancel: source.cancel,
    };
  }

  put({
    url,
    payload,
    config,
    showError = true,
  }: {
    url: string;
    payload: any;
    config: any;
    showError?: boolean;
  }) {
    const request_id = uuidv4();
    this.setHeader(config.header, request_id);
    const source = axios.CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .put(url, payload, { ...config, cancelToken: source.token })
          .then((res: any) => ({ ...res, request_id }))
          .catch((err: any) => this.onError({ ...err, request_id }, showError)),
      cancel: source.cancel,
    };
  }

  patch({
    url,
    payload,
    config,
    showError = true,
  }: {
    url: string;
    payload: any;
    config: any;
    showError?: boolean;
  }) {
    const request_id = uuidv4();
    this.setHeader(config.header, request_id);
    const source = axios.CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .patch(url, payload, { ...config, cancelToken: source.token })
          .then((res: any) => ({ ...res, request_id }))
          .catch((err: any) => this.onError({ ...err, request_id }, showError)),
      cancel: source.cancel,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async onError(
    error: {
      response: {
        status: number;
        data: {
          errorMsg?: any;
          errorCode?: any;
          msg?: any;
          code?: any;
          includes?: any;
          text?: any;
        };
      };
      request: { status: number };
      request_id: any;
    },
    isShowError = true,
  ) {
    if (axios.isCancel(error)) {
      // console.warn('canceled');
    } else {
      let status = 500;
      let errorKey = 'System Error';
      let errorCode = 0;
      let errorData = {};
      let errorMessage = '';
      // console.log(error.response);
      if (error.response) {
        status = error.response.status;
        errorKey =
          error.response.data && error.response.data.errorMsg
            ? error.response.data.errorMsg
            : errorKey;
        errorData = error.response.data;
        errorCode = error.response.data.errorCode;
        errorMessage = error.response.data.msg;
      } else if (error.request) {
        status = error.request.status;
      }

      const errorObj = {
        status,
        errorKey,
        errorData,
        errorCode,
        errorMessage,
      };

      let msg = '';

      try {
        switch (status) {
          case 401:
            if (error.response && error.response.data.msg) {
              msg = error.response.data.msg;
            } else {
              msg = 'Token Expired';
            }
            break;

          case 403:
            if (error.response && error.response.data.msg) {
              msg = error.response.data.msg;
            } else {
              msg = 'Forbidden';
            }
            break;

          case 404:
            if (error.response && error.response.data.msg) {
              msg = error.response.data.msg;
            } else {
              msg = 'Not Found';
            }
            break;

          default:
            if (error.response && error.response.data.msg) {
              msg = error.response.data.msg;
            }
            break;
        }
        if (isShowError) {
          message.error(`${msg} \n request_id: ${error.request_id}`, 2);
        }
        return await Promise.reject(
          new Error(
            JSON.stringify({
              ...error,
              data: error.response?.data,
            }),
          ),
        );
      } catch (e: any) {
        console.warn(`${e.name}: ${e.message}`);
      }

      throw new Error(JSON.stringify(errorObj));
    }
  }
}

export default AxiosApiClient;
