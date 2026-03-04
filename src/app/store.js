import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import quizReducer from "../features/quiz/quizSlice";
import bankReducer from "../features/bankAccount/bankSlice";
import logDataReducer from "../features/worldWise/logDataSlice";
import currPositionReducer from "../features/worldWise/currPositionSlice";
import cityListReducer from "../features/worldWise/cityListSlice";
import queryReducer from "../features/atomicBlog/querySlice";
import postsReducer from "../features/atomicBlog/postsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quiz: quizReducer,
    bank: bankReducer,

    // WorldWise App
    logData: logDataReducer,
    currPosition: currPositionReducer,
    cityList: cityListReducer,

    //AtomicBlog
    query: queryReducer,
    posts: postsReducer,
  },
});
