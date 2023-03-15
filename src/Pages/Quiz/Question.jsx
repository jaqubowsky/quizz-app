import {
  Answer,
  StyledAnswerContainer,
  StyledAnswers,
} from "../../Styles/Quiz.styled";
import { nanoid } from "nanoid";
import decodeHtmlEntities from "../../Utils/decodeHtml";

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

export { Question };
