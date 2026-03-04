import { useDispatch, useSelector } from "react-redux";
import {
  closeAccount,
  deposit150,
  openAccount,
  payLoan,
  reqLoan5000,
  selectBalance,
  selectLoan,
  selectStatus,
  withdraw50,
} from "./features/bankAccount/bankSlice";

function AppBankAccChallenge() {
  const balance = useSelector(selectBalance);
  const loan = useSelector(selectLoan);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Bank Account</h1>
      <h3>
        Balance: <strong>{balance}</strong>
      </h3>
      <h3>
        Loan: <strong>{loan}</strong>
      </h3>
      <div
        className="buttons"
        style={{
          display: "grid",
          gridTemplateColumns: "20rem",
          gap: "2rem",
          gridTemplateRows: "repeat(6,5rem)",
        }}
      >
        <button
          disabled={status === "open"}
          onClick={() => dispatch(openAccount())}
        >
          Open account
        </button>
        <button
          disabled={status === "close"}
          onClick={() => dispatch(deposit150(150))}
        >
          Deposit 150
        </button>
        <button
          disabled={status === "close"}
          onClick={() => dispatch(withdraw50(50))}
        >
          Withdraw 50
        </button>
        <button
          disabled={loan > 0 || status === "close"}
          onClick={() => dispatch(reqLoan5000(5000))}
        >
          Request loan 5000
        </button>
        <button disabled={loan < 1} onClick={() => dispatch(payLoan())}>
          Pay loan
        </button>
        <button
          disabled={status === "close" || loan !== 0 || balance !== 0}
          onClick={() => dispatch(closeAccount())}
        >
          Close account
        </button>
      </div>
    </div>
  );
}

export default AppBankAccChallenge;
