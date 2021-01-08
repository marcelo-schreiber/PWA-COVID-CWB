import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 1.5rem 3.5rem;
`;

export const TitleLogo = styled.h1`
  font-family: "Lobster", "Avner", "Segoe Script", "Kunstler Script", cursive;
  font-size: 4.265rem;
  letter-spacing: 0.04em;

  color: #fafafa;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Slogan = styled.h2`
  font-weight: normal;
  font-size: 4.265rem;
  line-height: 5.5rem;

  color: #fafafa;

  margin-bottom: 4rem;

  max-width: 42vw;

  @media only screen and (max-width: 680px) {
    max-width: 90vw;
  }
`;

export const Button = styled.button`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-color: #b85c2e;
  border-radius: 15px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 3.2rem;

  letter-spacing: 0.1em;

  border: none;

  padding: 1.2rem 3.5rem;

  color: #fafafafa;

  transition: 0.25s ease-in-out;

  cursor: pointer;

  position: relative;

  :hover {
    background-color: #934a25;
    transform: scale(1.04);
  }
`;

export const InstallButton = styled.button`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: #fd7e40;
  border-radius: 15px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;

  letter-spacing: 0.1em;

  border: none;

  padding: 0.6rem 1.75rem;

  color: #fafafafa;

  transition: 0.2s ease-in-out;

  cursor: pointer;

  margin-left: 3.5rem;

  :hover {
    background-color: #ca6533;
    transform: scale(1.05);
  }
`;

export const LandingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin: 0 3.5rem;

  @media only screen and (max-width: 980px) {
    flex-direction: column;

    > div {
      margin: 3.5rem 0;
    }
  }
`;
