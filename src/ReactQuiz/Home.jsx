import { useDispatch, useSelector } from "react-redux";
import { selectQuestions, startQuiz } from "../features/quiz/quizSlice";

function Home() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch(startQuiz())}>
        Let's start
      </button>
    </div>
  );
}

export default Home;
