import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../../lib/supabaseClient";
import {
  clearSession,
  setSession,
} from "../../../features/worldWise/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(
          setSession({ user: session.user, token: session.access_token }),
        );
      }
    });

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        dispatch(
          setSession({ user: session.user, token: session.access_token }),
        );
      }
      if (event === "SIGNED_OUT") {
        dispatch(clearSession());
      }
    });

    // CLeanup subscription
    return () => subscription.unsubscribe;
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
