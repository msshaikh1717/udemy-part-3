import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import quizReducer from "../features/quiz/quizSlice";
import bankReducer from "../features/bankAccount/bankSlice";
// import logDataReducer from "../features/worldWise/logDataSlice";
import currPositionReducer from "../features/worldWise/currPositionSlice";
import cityListReducer from "../features/worldWise/cityListSlice";
import queryReducer from "../features/atomicBlog/querySlice";
import postsReducer from "../features/atomicBlog/postsSlice";
import authReducer from "../features/worldWise/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quiz: quizReducer,
    bank: bankReducer,

    // WorldWise App
    currPosition: currPositionReducer,
    cityList: cityListReducer,
    // logData: logDataReducer, //Temp slice to be replaced with supabase
    auth: authReducer,
    //AtomicBlog
    query: queryReducer,
    posts: postsReducer,
  },
});
