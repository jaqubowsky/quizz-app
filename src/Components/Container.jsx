import styled from "styled-components";

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1em 0;
  width: 80%;
  font-size: 1.1rem;
  gap: 1em;
  color: ${(props) => props.theme.colors.font};

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
