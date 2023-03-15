import { Home } from "./Pages/Home/Home";
import { Quiz } from "./Pages/Quiz/Quiz";
import { nanoid } from "nanoid";
import { GlobalStyle } from "./Styles/Global";
import { Theme } from "./Styles/Theme";
import { useState } from "react";
import { shuffle } from "./Utils/shuffle";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import { Load } from "./Components/Loader";

function App() {
  const [isClicked, setIsClicked] = useState(false);

  async function fetchQuestions() {
    const response = await trackPromise(
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    );
    const data = await trackPromise(response.json());
    const questions = data.results.map((question) => ({
      question: question.question,
      correct_answer: question.correct_answer,
      all_answers: shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]).map((answer) => ({
        answer: answer,
        isPicked: false,
        isCorrect: answer === question.correct_answer,
      })),
      id: nanoid(),
    }));

    return questions;
  }

  const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker({ delay: 500 });

    return promiseInProgress && <Load />;
  };

  return (
    <Theme>
      <GlobalStyle />
      <LoadingIndicator />
      {!isClicked ? (
        <Home handleClick={() => setIsClicked(true)} />
      ) : (
        <Quiz fetchQuestions={fetchQuestions} />
      )}
    </Theme>
  );
}

export default App;
