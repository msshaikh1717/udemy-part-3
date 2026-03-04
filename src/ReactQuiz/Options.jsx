import { useDispatch, useSelector } from "react-redux";
import {
  checkAnswer,
  selectQuestions,
  selectCurrentQuestion,
  selectSelectedOption,
} from "../features/quiz/quizSlice";

function Options() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const selectedOption = useSelector(selectSelectedOption);

  return (
    <div className="options">
      {questions?.[currentQuestion].options.map((ans, index) => (
        <button
          disabled={selectedOption !== null}
          className={`btn btn-option ${
            selectedOption !== null && index === selectedOption ? "answer" : ""
          } ${
            selectedOption !== null &&
            (questions?.[currentQuestion].correctOption === index
              ? "correct"
              : "wrong")
          }`}
          key={index}
          onClick={() => dispatch(checkAnswer(index))}
        >
          {ans}
        </button>
      ))}
    </div>
  );
}

export default Options;
