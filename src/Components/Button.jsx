import styled from "styled-components";

const StyledButton = styled.button`
  background: ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.buttonFont};
  outline: hidden;
  border: none;
  border-radius: 15px;
  padding: 1em 3em;
  cursor: pointer;
`;

const Button = (props) => {
  return <StyledButton onClick={props.handleClick}>{props.name}</StyledButton>;
};

export default Button;
