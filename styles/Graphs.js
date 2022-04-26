import styled from 'styled-components';

export const MainTitle = styled.h2`
  font-family: Montserrat;
  font-size: 4.265rem;
  line-height: 5.2rem;
  letter-spacing: 0.04em;

  color: #fafafafa;

  @media only screen and (max-width: 400px) {
    font-size: 3.5rem;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 4.25rem 0;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;

    > h2 {
      margin-bottom: 1.5rem;
    }
  }
`;

export const Selection = styled.select`
  font-family: Montserrat;
  font-size: 2.3rem;
  letter-spacing: 0.04em;

  padding: 1rem 3rem;

  background: #ffffff;
  border-radius: 16px;
  color: #3638ad;
`;

export const GraphsContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  background-color: #fff;

  padding: 5rem 0;

  > div {
    margin: 5rem;
  }
`;
