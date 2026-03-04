import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppDateCounter from "./AppDateCounter";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppReactQuiz from "./AppReactQuiz";
import AppBankAccChallenge from "./AppBankAccChallenge";
import AppWorldWise from "./WorldWise/AppWorldWise";
import AppAtomicBlog from "./AppAtomicBlog";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <AppDateCounter /> */}
      {/* <AppReactQuiz /> */}
      {/* <AppBankAccChallenge /> */}

      <AppWorldWise />
      {/* <AppAtomicBlog /> */}
    </Provider>
  </StrictMode>,
);
