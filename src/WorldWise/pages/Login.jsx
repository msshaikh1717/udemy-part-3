import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { setLogData } from "../../features/worldWise/logDataSlice";
import {
  loginUser,
  selectAuthError,
  selectAuthLoading,
} from "../../features/worldWise/authSlice";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const onSubmit = async (data) => {
    try {
      const newData = await dispatch(loginUser(data)).unwrap();

      navigate("/app/cities");
    } catch (error) {
      console.log(error, "<== error");
    }
  };

  //useEffect for checking if user has logged in b4 with localStorage
  useEffect(() => {
    async function checkPrevLogin() {
      const { data, error } = await supabase.auth.getSession();
      // console.log(data, "<== data");
      // const { access_token } = data.session;
    }
    checkPrevLogin();
  }, []);

  return (
    <>
      {authLoading && <Spinner />}
      {!authError && !authLoading && (
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
              defaultValue="udemy3@example.com"
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
              defaultValue="udemy3"
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
      )}
    </>
  );
}

export default Login;
