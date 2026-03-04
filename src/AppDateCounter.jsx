import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  reset,
  selectCalculatedDate,
  setCount,
  setStep,
} from "./features/counter/counterSlice";

function AppDateCounter() {
  const count = useSelector((state) => state.counter.value);
  const step = useSelector((state) => state.counter.step);
  const calculatedDate = useSelector(selectCalculatedDate);

  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="range"
        min={1}
        max={10}
        value={step}
        onChange={(e) => dispatch(setStep(+e.target.value))}
      />
      <span>{step}</span>
      <div className="action">
        <button onClick={() => dispatch(decrement())}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => dispatch(setCount(+e.target.value))}
        />
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <p>{calculatedDate}</p>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default AppDateCounter;
