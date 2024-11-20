import styled, { createGlobalStyle } from 'styled-components';

import MicrosoftJhengHei from '@/static/fonts/Microsoft-JhengHei.woff2';
import TimesNewRoman from '@/static//fonts/Times-New-Roman.woff2';

export const GlobalStyle = createGlobalStyle`
  * {
    @font-face {
      font-family: 'MicrosoftJhengHei';
      src: url(${MicrosoftJhengHei}) format('woff2');
    }

    @font-face {
      font-family: 'TimesNewRoman';
      src: url(${TimesNewRoman}) format('woff2');
    }

    font-family: "MicrosoftJhengHei", "Microsoft JhengHei", "微軟正黑體", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

export const MainContainer = styled.div`
  background-color: salmon;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
