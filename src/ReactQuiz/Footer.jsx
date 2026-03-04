import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  selectIsQuizOver,
  selectSecondsRemaining,
  selectSelectedOption,
  tick,
} from "../features/quiz/quizSlice";
import { useEffect } from "react";

function Footer() {
  const dispatch = useDispatch();
  const selectedOption = useSelector(selectSelectedOption);
  const isQuizOver = useSelector(selectIsQuizOver);
  const secondsRemaining = useSelector(selectSecondsRemaining);

  useEffect(() => {
    const id = setInterval(() => dispatch(tick()), 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <footer>
      <p className="timer">{`${mins < 10 ? "0" : ""}${mins}:${
        seconds < 10 ? "0" : ""
      }${seconds}`}</p>
      {selectedOption !== null && (
        <button className="btn" onClick={() => dispatch(nextQuestion())}>
          {isQuizOver ? "Finish Game" : "Next"}
        </button>
      )}
    </footer>
  );
}

export default Footer;
