import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { RootState } from 'store/rootReducer';

const CheckboxListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const StyledCheckbox = styled.input`
  margin-right: 10px;
`;

const CheckboxItemContainer = styled.div`
  margin-right: 15px;
`;

type SecialtiesProps = {
  specialties: string[];
  onChange: (selectedSpecialties: string[]) => void;
};

const Secialties: FunctionComponent<SecialtiesProps> = ({
  onChange,
  specialties: specialtiesProp
}) => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<Array<string>>(
    specialtiesProp
  );
  const specialties = useSelector(
    (state: RootState) => state.companies.specialties.specialties
  );

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextSelectedSpecialties: string[] = [];
    if (event.target.checked) {
      if (!selectedSpecialties.includes(event.target.name)) {
        nextSelectedSpecialties = [...selectedSpecialties, event.target.name];
        setSelectedSpecialties(nextSelectedSpecialties);
      }
    } else {
      nextSelectedSpecialties = selectedSpecialties.filter(function (item) {
        return item !== event.target.name;
      });
      setSelectedSpecialties(nextSelectedSpecialties);
    }
    onChange(nextSelectedSpecialties);
  };

  return (
    <CheckboxListContainer>
      {specialties?.map((specialty, index) => {
        const checked = selectedSpecialties.includes(specialty);
        return (
          <CheckboxItemContainer key={index}>
            <StyledCheckbox
              id={`specialty-cb-${index}`}
              type="checkbox"
              name={specialty}
              checked={checked}
              onChange={onCheckboxChange}
            />
            <label htmlFor={`specialty-cb-${index}`}>{specialty}</label>
          </CheckboxItemContainer>
        );
      })}
    </CheckboxListContainer>
  );
};

export default Secialties;
