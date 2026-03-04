import { useSelector } from "react-redux";
import {
  selectCurrentQuestion,
  selectPoints,
  selectQuestions,
  selectSelectedOption,
} from "../features/quiz/quizSlice";

function Progress() {
  const questions = useSelector(selectQuestions);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const points = useSelector(selectPoints);
  const selectedOption = useSelector(selectSelectedOption);

  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={currentQuestion + Number(selectedOption !== null)}
      />
      <p>
        Question <strong>{currentQuestion + 1}</strong>/{questions.length}
      </p>
      <p>
        <strong>{points}</strong>/
        {questions.reduce(
          (prevValue, currValue) => prevValue + currValue.points,
          0
        )}{" "}
        points
      </p>
    </header>
  );
}

export default Progress;
