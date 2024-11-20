import AxiosApiClient from './AxiosApiClient';
import { AUTH } from './url';

const apiClient = new AxiosApiClient();

interface PostPayload {
  email: string;
  password: string;
}

export const login = async (payload: PostPayload) => {
  const config = {};

  const { data } = await apiClient
    .post({
      url: AUTH.LOGIN,
      payload,
      config,
    })
    .send();

  return data;
};
