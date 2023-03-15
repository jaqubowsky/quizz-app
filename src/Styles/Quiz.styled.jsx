import styled from "styled-components";

const StyledQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em 0;
  gap: 1em;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderQuestion};
`;

const StyledResultContainer = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

const StyledAnswers = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Answer = styled.div`
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.borderAnswer};
  padding: 0.2em 0.8em;
  border-radius: 15px;
  font-size: 1.1rem;
  width: 20%;
  cursor: pointer;
  background: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.hover};
  }
`;

export {
  StyledQuestionContainer,
  StyledAnswerContainer,
  StyledResultContainer,
  StyledAnswers,
  Answer,
};
