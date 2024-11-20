import React, { Suspense, lazy, useEffect, useState } from 'react';

import 'antd/dist/reset.css';

const Home = lazy(() => import('./Home/Home' /* webpackChunkName:"Home" */));
const Login = lazy(
  () => import('./Login/Login' /* webpackChunkName:"Login" */),
);

interface PropsType {
  pageName: string;
}

const pageMap: { [key: string]: any } = {
  Home: <Home />,
  Login: <Login />,
};

const Entry: React.FC<PropsType> = (porps) => {
  const { pageName } = porps;

  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    setIsVerified(true);
  });

  return isVerified ? pageMap[pageName] : '';
};

const Pages: React.FC<PropsType> = (props) => {
  const { pageName } = props;

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Entry pageName={pageName} />
    </Suspense>
  );
};

export default Pages;
