import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';

import i18n from '@/locales/i18n';

import Entry from '@/pages/index';

import PATH from '@/utils/path';

import * as style from './style';

import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
);

root.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div>loading...</div>}>
      <style.GlobalStyle />
      <style.MainContainer>
        <Router>
          <Link to={PATH.HOME}>go home</Link>
          <Link to={PATH.LOGIN}>go login</Link>
          <Routes>
            <Route path={PATH.HOME} element={<Entry pageName="Home" />} />
            <Route path={PATH.LOGIN} element={<Entry pageName="Login" />} />
          </Routes>
        </Router>
      </style.MainContainer>
    </Suspense>
  </I18nextProvider>,
);
