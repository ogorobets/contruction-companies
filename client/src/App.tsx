import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/app.scss';
import Companies from './components/Companies/Companies';

const StyledContainer = styled(Container)`
  padding: 20px;
  height: 100%;
`;

const App: FunctionComponent<Record<string, unknown>> = () => {
  return (
    <>
      <StyledContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Companies />} />
          </Routes>
        </Router>
      </StyledContainer>
    </>
  );
};

export default App;
