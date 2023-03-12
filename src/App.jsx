import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import GlobalStyle from "./Styles/Global";
import Theme from "./Styles/Theme";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);

useEffect(() => {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then((res) => res.json())
    .then((data) => {
      const formattedData = data.results.map((question) => ({
        question: question.question,
        correct_answer: question.correct_answer,
        all_answers: [...question.incorrect_answers, question.correct_answer],
        id: nanoid(),
      }));
      setQuestionsData(formattedData);
    });
}, []);

  return (
    <Theme>
      <GlobalStyle />
      {!isClicked ? (
        <Home handleClick={() => setIsClicked(true)} />
      ) : (
        <Quiz questionsData={questionsData} />
      )}
    </Theme>
  );
}

export default App;
