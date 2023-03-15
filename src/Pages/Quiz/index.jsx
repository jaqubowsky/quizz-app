import Container from "../../Components/Container";
import Button from "../../Components/Button";
import { useState, useEffect } from "react";
import decodeHtmlEntities from "../../Utils/decodeHtml";
import { nanoid } from "nanoid";
import {
  StyledQuestionContainer,
  StyledAnswerContainer,
  StyledResultContainer,
  StyledAnswers,
  Answer,
} from "../../Styles/Quiz.styled";

const Quiz = ({ fetchQuestions }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    setQuestions();
  }, []);

  function setQuestions() {
    fetchQuestions().then((data) => setQuestionsData(data));
  }

  const questionElement = questionsData.map((question) => (
    <Question
      key={question.id}
      questionData={question}
      isFinished={isFinished}
      handleClick={pickAnswer}
    />
  ));

  function pickAnswer(event, currentQuestionId) {
    setQuestionsData((prevData) => {
      return prevData.map((question) => {
        if (question.id === currentQuestionId) {
          return {
            ...question,
            all_answers: question.all_answers.map((answer) => {
              const isPicked =
                decodeHtmlEntities(answer.answer) === event.target.textContent;
              return { ...answer, isPicked: isPicked };
            }),
          };
        } else {
          return question;
        }
      });
    });
  }

  function checkAnswers() {
    questionsData.forEach((question) => {
      question.all_answers.forEach((answer) => {
        if (answer.isPicked && answer.isCorrect) {
          setCorrect((prevScore) => prevScore + 1);
        }
      });
    });

    setIsFinished(true);
  }

  function playAgain() {
    setQuestions();
    setIsFinished(false);
    setCorrect(0);
  }

  return (
    <Container>
      <StyledQuestionContainer>{questionElement}</StyledQuestionContainer>
      <StyledResultContainer>
        {isFinished && (
          <h3>{`You scored ${correct} / ${questionsData.length} correct answers`}</h3>
        )}
        {!isFinished ? (
          <Button
            handleClick={() => checkAnswers()}
            name="Check answers"
          ></Button>
        ) : (
          <Button handleClick={() => playAgain()} name="Play again"></Button>
        )}
      </StyledResultContainer>
    </Container>
  );
};

const Question = ({ questionData, handleClick, isFinished }) => {
  const answerElement = questionData.all_answers.map((answer) => {
    const setColor = () => {
      if (isFinished) {
        return answer.isCorrect
          ? (props) => props.theme.colors.correct
          : answer.isPicked
          ? (props) => props.theme.colors.incorrect
          : (props) => props.theme.colors.default;
      } else {
        return answer.isPicked
          ? (props) => props.theme.colors.picked
          : (props) => props.theme.colors.default;
      }
    };

    return (
      <Answer
        color={setColor()}
        hover={!isFinished ? (props) => props.theme.colors.hover : ""}
        key={nanoid()}
        onClick={!isFinished ? () => handleClick(event, questionData.id) : ""}
      >
        {decodeHtmlEntities(answer.answer)}
      </Answer>
    );
  });

  return (
    <StyledAnswerContainer>
      <h2>{decodeHtmlEntities(questionData.question)}</h2>
      <StyledAnswers>{answerElement}</StyledAnswers>
    </StyledAnswerContainer>
  );
};

export default Quiz;
