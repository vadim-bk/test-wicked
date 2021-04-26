import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import { Users } from './components/Users';
import { getLoading } from './components/Users/selectors';

const Wrapper = styled.div`
  margin: 20px;
`;

export const App: React.FC = () => {
  const loading = useSelector(getLoading);

  return (
    <>
      {loading && <LinearProgress />}

      <Wrapper>
        <Users />
      </Wrapper>
    </>
  );
};

export default App;
