import { useEffect } from "react";
import Header from "./ReactQuiz/Header";
import "./ReactQuiz/index.css";
import Loader from "./ReactQuiz/Loader";
import Home from "./ReactQuiz/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  selectQuestions,
  selectCurrentQuestion,
  selectStatus,
} from "./features/quiz/quizSlice";
import ErrorMessage from "./ReactQuiz/ErrorMessage";
import Options from "./ReactQuiz/Options";
import Progress from "./ReactQuiz/Progress";
import FinishedGame from "./ReactQuiz/FinishedGame";
import Footer from "./ReactQuiz/Footer";

function AppReactQuiz() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const currentQuestion = useSelector(selectCurrentQuestion);

  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      {/* Sidebar */}
      {status === "loading" && <Loader />}
      {status === "error" && <ErrorMessage />}

      {status === "ready" && <Home />}
      {status === "active" && questions.length > 0 && (
        <>
          <Progress />
          <h4>{questions?.[currentQuestion].question}</h4>
          <Options />
          <Footer />
        </>
      )}
      {status === "finished" && <FinishedGame />}
    </div>
  );
}

export default AppReactQuiz;
