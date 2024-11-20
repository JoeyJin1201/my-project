import React, { useEffect, useState } from 'react';

import { Select } from '@/components/atoms';

import ImageLogo from '@/static/images/header_logo@2x.png';

import * as style from './style';

const Home: React.FC = () => {
  const [value, setvalue] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log('Home');
  }, []);

  return (
    <style.HomeContainer>
      <h1>Home</h1>
      <Select
        placeholder="Select one"
        allowClear
        value={value}
        onChange={(val: string) => setvalue(val)}
        options={[
          {
            label: 'label1',
            value: 'value1',
          },
          {
            label: 'label2',
            value: 'value2',
          },
        ]}
        style={{ width: '128px' }}
      />

      <img src={ImageLogo} alt="Logo" />
      <h1>React with Typescript</h1>
    </style.HomeContainer>
  );
};

export default Home;
