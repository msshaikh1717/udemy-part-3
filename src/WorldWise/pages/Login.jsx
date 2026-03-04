import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLogData } from "../../features/worldWise/logDataSlice";
import { loginUser } from "../../features/worldWise/authSlice";

function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.email === "jack@example.com" && data.password === "*****") {
      dispatch(setLogData(data));
    }
    const newData = await dispatch(loginUser(data)).unwrap();
    console.log(newData, "<== newData");
    // navigate("/app/cities");
  };

  return (
    <div
      className="login"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <form
        action="/login"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "40rem" }}
      >
        <p
          style={{
            fontSize: "3rem",
            fontWeight: 600,
            height: "5rem",
            width: "40rem",
          }}
        >
          Email address
        </p>
        <input
          defaultValue="ethan.martinez@x.dummyjson.com"
          {...register("email")}
          style={{
            marginBottom: "4rem",
            height: "5rem",
            width: "40rem",
            fontSize: "2.5rem",
          }}
        />

        <p
          style={{
            fontSize: "3rem",
            fontWeight: 600,
            height: "5rem",
            width: "40rem",
          }}
        >
          Password
        </p>
        <input
          defaultValue="password"
          {...register("password")}
          style={{
            marginBottom: "4rem",
            height: "5rem",
            width: "40rem",
            fontSize: "2.5rem",
          }}
        />
        <button
          style={{
            height: "5rem",

            background: "#00c46a",
            borderRadius: "1rem",
            padding: "0 2rem",
            fontSize: "2rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
