import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthApi } from '@/apis';

import { Input } from '@/components/atoms';
import { FilledButton } from '@/components/atoms/Button/Custom';

import { useMessage } from '@/hooks';

import IconRecommend from '@/static/images/icons/recommend.svg';

import colors from '@/utils/colors';

import * as style from './style';

const Login: React.FC = () => {
  const [account, setAccount] = useState('joey_jin@wistron.com');
  const [password, setPassword] = useState('a12345');

  const { t } = useTranslation();

  const message = useMessage();

  const login = async () => {
    try {
      const payload = {
        email: account,
        password,
      };
      const result = await AuthApi.login(payload);
      console.log(result);
      if (result.code === 0) {
        message.success('Login Success');
      }
      if (result.code !== 0) {
        return await Promise.reject(result);
      }
      return await Promise.resolve(result);
    } catch (err) {
      // console.log(err);
      return Promise.reject(err);
    }
  };

  const handleLogin = async () => {
    await login()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log('Login');
  }, []);

  return (
    <style.LoginContainer>
      <h1>Login</h1>

      <Input
        value={account}
        onChange={(e: any) => setAccount(e.target.value)}
      />
      <Input.Password
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <FilledButton
        height={32}
        width={96}
        color={colors.blue_800}
        onClick={handleLogin}
      >
        <span>{t('COMMON.sign_in')}</span>
        <IconRecommend />
      </FilledButton>
    </style.LoginContainer>
  );
};

export default Login;
