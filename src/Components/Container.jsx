import styled from "styled-components";

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  width: 700px;
  gap: 1.5em;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.font};
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
