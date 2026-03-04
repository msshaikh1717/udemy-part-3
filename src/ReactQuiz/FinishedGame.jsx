import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  selectHighScore,
  selectPoints,
  selectQuestions,
  selectSecondsRemaining,
} from "../features/quiz/quizSlice";

function FinishedGame() {
  const points = useSelector(selectPoints);
  const questions = useSelector(selectQuestions);
  const highscore = useSelector(selectHighScore);
  const secondsRemaining = useSelector(selectSecondsRemaining);

  const dispatch = useDispatch();
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const scorePercentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        {secondsRemaining <= 0 && <span>Timout!!!</span>}
        You scored <strong>{points}</strong> out of {maxPossiblePoints}(
        {Math.ceil(scorePercentage)}%)
      </p>
      <p className="highscore">(Highscore:{highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch(reset())}>
        Restart Game
      </button>
    </>
  );
}

export default FinishedGame;
