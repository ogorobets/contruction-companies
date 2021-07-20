import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import { RootState } from 'store/rootReducer';
import { Loading } from 'constants/constants';

const StyledImage = styled.img`
  height: 50px;
  width: 50px;
`;

const ThTdCity = css`
  width: 20%;
`;

const ThTdSpecialty = css`
  width: 20%;
`;

const TdLogo = styled.td`
  width: 75px;
`;

const TdCity = styled.td`
  ${ThTdCity}
`;

const TdSpecialty = styled.td`
  ${ThTdSpecialty}
`;

const ThLogo = styled.th`
  width: 75px;
`;

const ThCity = styled.th`
  ${ThTdCity}
`;

const ThSpecialty = styled.th`
  ${ThTdSpecialty}
`;

const CompanyListContainer = styled.div`
  margin-top: 20px;
  height: calc(100% - 160px);
`;

const SpinnerCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledTableHead = styled(Table)`
  margin-bottom: 0;

  & thead th {
    border-bottom: none !important;
  }
`;

const StyledTableBody = styled(Table)`
  border-top: none !important;
  margin-bottom: 0;

  & tbody td {
    border-top: none !important;
  }
`;

const CompanyList: FunctionComponent<Record<string, unknown>> = () => {
  const companies =
    useSelector((state: RootState) => state.companies.companies.companies) ||
    [];
  const loading = useSelector(
    (state: RootState) => state.companies.companies.loading
  );
  const isLoadingState = [Loading.INITIAL, Loading.PENDING].includes(loading);

  return (
    <CompanyListContainer>
      {isLoadingState ? (
        <Row>
          <SpinnerCol>
            <Spinner animation="border" variant="primary" />
          </SpinnerCol>
        </Row>
      ) : companies.length === 0 ? (
        <Row>
          <Col>No data found</Col>
        </Row>
      ) : (
        <>
          <StyledTableHead striped bordered hover>
            <thead>
              <tr>
                <ThLogo>Logo</ThLogo>
                <th>Company Name</th>
                <ThCity>City</ThCity>
                <ThSpecialty>Specialty</ThSpecialty>
              </tr>
            </thead>
          </StyledTableHead>
          <Scrollbars style={{ width: '100%', height: 'calc(100% - 50px)' }}>
            <StyledTableBody striped bordered hover>
              <tbody>
                {companies?.map((company, index) => {
                  return (
                    <tr key={index}>
                      <TdLogo>
                        <StyledImage src={company.logo}></StyledImage>
                      </TdLogo>
                      <td>{company.name}</td>
                      <TdCity>{company.city}</TdCity>
                      <TdSpecialty>{company.specialty}</TdSpecialty>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTableBody>
          </Scrollbars>
        </>
      )}
    </CompanyListContainer>
  );
};

export default CompanyList;
