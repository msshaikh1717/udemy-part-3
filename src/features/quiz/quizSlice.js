import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async () => {
    const res = await fetch("http://localhost:9000/questions");
    const data = await res.json();

    return data;
  }
);
const initialState = {
  questions: [],
  points: 0,
  currentQuestion: 0,
  status: "loading", //error | 'loading' | 'ready' | 'active', finished
  error: null,
  isQuizOver: false,
  selectedOption: null,
  highScore: 0,
  secondsRemaining: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state) => {
      state.status = "active";
      state.secondsRemaining = state.questions.length * 10;
    },
    nextQuestion: (state) => {
      state.currentQuestion += 1;
      state.selectedOption = null;
      if (state.isQuizOver) {
        state.status = "finished";
        state.highScore = Math.max(state.highScore, state.points);
      }
    },
    checkAnswer: (state, action) => {
      state.selectedOption = action.payload;
      state.questions[state.currentQuestion].correctOption === action.payload
        ? (state.points += state.questions[state.currentQuestion].points)
        : state.points;

      if (state.currentQuestion >= state.questions.length - 1)
        state.isQuizOver = true;
    },
    tick: (state) => {
      state.secondsRemaining = state.secondsRemaining - 1;
      if (state.secondsRemaining <= 0) state.status = "finished";
    },
    reset: (state) => {
      state.currentQuestion = 0;
      state.points = 0;
      state.status = "ready";
      state.error = null;
      state.isQuizOver = false;
      state.selectedOption = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "ready";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const selectQuestions = (state) => state.quiz.questions;
export const selectPoints = (state) => state.quiz.points;
export const selectCurrentQuestion = (state) => state.quiz.currentQuestion;
export const selectStatus = (state) => state.quiz.status;
export const selectIsQuizOver = (state) => state.quiz.isQuizOver;
export const selectSelectedOption = (state) => state.quiz.selectedOption;
export const selectHighScore = (state) => state.quiz.highScore;
export const selectSecondsRemaining = (state) => state.quiz.secondsRemaining;

export const { startQuiz, nextQuestion, checkAnswer, reset, tick } =
  quizSlice.actions;

export default quizSlice.reducer;
