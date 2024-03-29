import Container from "../../Components/Container";
import Button from "../../Components/Button";
import { useState, useEffect } from "react";
import decodeHtmlEntities from "../../Utils/decodeHtml";
import {
  StyledQuestionContainer,
  StyledResultContainer,
} from "../../Styles/Quiz.styled";
import { Question } from "./Question";
import { usePromiseTracker } from "react-promise-tracker";
import { Load } from "../../Components/Loader";
import { trackPromise } from "react-promise-tracker";

export const Quiz = ({ fetchQuestions }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    setQuestions();
  }, []);

  function setQuestions() {
    trackPromise(fetchQuestions()).then((data) => setQuestionsData(data));
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

  const { promiseInProgress } = usePromiseTracker({ delay: 500 });

  return (
    <>
      {promiseInProgress ? (
        <Load />
      ) : (
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
              <Button
                handleClick={() => playAgain()}
                name="Play again"
              ></Button>
            )}
          </StyledResultContainer>
        </Container>
      )}
    </>
  );
};
