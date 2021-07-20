import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route exact path="/" component={Companies} />
          </Switch>
        </Router>
      </StyledContainer>
    </>
  );
};

export default App;
