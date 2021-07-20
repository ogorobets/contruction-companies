import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import {
  getCompaniesData,
  getSpecialtiesData,
  getCompanyPageAmount as getCompanyPageAmountAction
} from 'actions';
import CompanyList from 'components/CompanyList/CompanyList';
import Secialties from 'components/Specialties/Secialties';
import { RootState } from '../../store/rootReducer';
import { Loading } from '../../constants/constants';

import './companies.scss';

type SearchSubject = {
  search: string;
  specialties: string[];
};

const searchSubject = new Subject<SearchSubject>();
const searchResultObservable = searchSubject.pipe(
  debounceTime(750),
  distinctUntilChanged()
);

const ReactPaginateContainer = styled.div<{ disabled: boolean }>`
  ${({ disabled }) => (disabled ? `pointer-events: none;` : ``)}
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Companies: FunctionComponent<Record<string, unknown>> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { search: searchString } = useLocation();
  const s = new URLSearchParams(searchString).get('s') || '';
  const specsStr = new URLSearchParams(searchString).get('specs') || '';
  const specs = (specsStr && specsStr.split(',')) || [];
  const [search, setSearch] = useState<string>(s);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [specialties, setSpecialties] = useState<string[]>(specs);
  const companies =
    useSelector((state: RootState) => state.companies.companies.companies) ||
    [];
  const companyPageAmount = useSelector(
    (state: RootState) => state.companies.companyPageAmount.amount
  );
  const companyPageAmountLoading = useSelector(
    (state: RootState) => state.companies.companyPageAmount.loading
  );
  const showPagination = ![Loading.INITIAL, Loading.PENDING].includes(
    companyPageAmountLoading
  );
  let subscription = useRef<Subscription>();

  const getCompanies = useCallback(
    (params?: { search?: string; specialties?: string[]; page?: number }) => {
      const { search = '', specialties = [], page = 0 } = params || {};
      dispatch(getCompaniesData({ search, specialties, page }));
    },
    [dispatch]
  );

  const getSpecialties = useCallback(() => {
    dispatch(getSpecialtiesData());
  }, [dispatch]);

  const getCompanyPageAmount = useCallback(
    (params: { search: string; specialties: string[] }) => {
      dispatch(getCompanyPageAmountAction(params));
    },
    [dispatch]
  );

  const onSpecialtiesChange = (specialties: string[]) => {
    setSelectedPage(0);
    setSpecialties(specialties);
    getCompanyPageAmount({ search, specialties });
    getCompanies({ search, specialties, page: 0 });
    setQueryParams({ search, specialties });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchSubject.next({ search: e.target.value, specialties });
  };

  const handlePageClick = ({
    selected: selectedPage
  }: {
    selected: number;
  }) => {
    setSelectedPage(selectedPage);
    getCompanies({ search, specialties, page: selectedPage });
  };

  const setQueryParams = ({
    search,
    specialties
  }: {
    search: string;
    specialties: string[];
  }) => {
    let searchQuery = '';
    if (search) {
      searchQuery = new URLSearchParams({ s: search }).toString();
    }
    if (specialties.length > 0) {
      searchQuery = `${searchQuery}${
        searchQuery ? '&' : ''
      }${new URLSearchParams({ specs: specialties.join() }).toString()}`;
    }
    if (searchQuery) {
      searchQuery = `?${searchQuery}`;
    }
    history.push({
      pathname: '/',
      search: searchQuery
    });
  };

  useEffect(() => {
    subscription.current = searchResultObservable.subscribe(
      ({ search, specialties }: SearchSubject) => {
        setQueryParams({ search, specialties });
        getCompanyPageAmount({ search, specialties });
        getCompanies({ search, specialties });
      }
    );

    return () => {
      subscription.current?.unsubscribe();
    };
  }, [searchResultObservable, getCompanies]);

  useEffect(() => {
    getCompanyPageAmount({ search, specialties });
    getCompanies({ search, specialties });
    getSpecialties();
  }, [getCompanies, getSpecialties, getCompanyPageAmount]);

  return (
    <>
      <Form.Control
        placeholder="Enter company name"
        onChange={onInputChange}
        value={search}
      />
      <Secialties specialties={specialties} onChange={onSpecialtiesChange} />
      <CompanyList />
      {showPagination && companyPageAmount !== 0 ? (
        <ReactPaginateContainer disabled={companyPageAmount === 1}>
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={companyPageAmount!}
            pageRangeDisplayed={10}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            disabledClassName={'pagination__link--disabled'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </ReactPaginateContainer>
      ) : null}
    </>
  );
};

export default Companies;