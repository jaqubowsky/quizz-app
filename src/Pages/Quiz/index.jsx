import Container from "../../Components/Container";
import { useState } from "react";
import styled from "styled-components";
import decodeHtmlEntities from "../../Utils/decodeHtml";
import { nanoid } from "nanoid";

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
    background-color: ${(props) => props.theme.colors.hover};
  }
`;

const Question = ({ questionData }) => {
  const answersDataObject = questionData.all_answers.map((answer) => ({
    answer: answer,
    isPicked: false,
    isCorrect: answer === questionData.correct_answer ? true : false,
    id: nanoid(),
  }));

  const [answersData, setAnswersData] = useState(answersDataObject);

  const answerElement = answersData.map((answer) => (
    <Answer
      color={answer.isPicked ? (props) => props.theme.colors.picked : "white"}
      onClick={pickAnswer}
      key={answer.id}
    >
      {decodeHtmlEntities(answer.answer)}
    </Answer>
  ));

  function pickAnswer(e) {
    setAnswersData((prevData) =>
      prevData.map((answer) => {
        if (decodeHtmlEntities(answer.answer) === e.target.textContent) {
          return { ...answer, isPicked: !answer.isPicked };
        } else {
          return { ...answer, isPicked: false };
        }
      })
    );

    console.log(answersData);
  }

  return (
    <StyledAnswerContainer>
      <h2>{decodeHtmlEntities(questionData.question)}</h2>
      <StyledAnswers>{answerElement}</StyledAnswers>
    </StyledAnswerContainer>
  );
};

const Quiz = (props) => {
  const questionElement = props.questionsData.map((question) => (
    <Question key={question.id} questionData={question} />
  ));

  return (
    <Container>
      <StyledQuestionContainer>{questionElement}</StyledQuestionContainer>
    </Container>
  );
};

export default Quiz;
