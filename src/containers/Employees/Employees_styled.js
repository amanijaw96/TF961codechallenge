import styled from "styled-components";

export const FiltersWrapper = styled.div`
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;
