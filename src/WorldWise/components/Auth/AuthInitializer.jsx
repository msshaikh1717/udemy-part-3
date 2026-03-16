// AuthInitializer – The Session Watcher: This component runs once when your app mounts. It does two critical things:
// a. Check for existing session
// b. Listen for future auth changes

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../../lib/supabaseClient";
import {
  clearSession,
  setInitialized,
  setSession,
} from "../../../features/worldWise/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Check for existing session: getSession() is synchronous (reads from memory/localStorage), but we use .then to keep the pattern consistent. It immediately resolves. If a session exists, we populate Redux and mark initialized. If not, we simply mark initialized – this allows ProtectedRoute to proceed and redirect to login if needed.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(
          setSession({ user: session.user, token: session.access_token }),
        );
      } else dispatch(setInitialized()); // mark as ready even though no session
    });

    // 2. Listen for auth changes: This subscription keeps Redux in sync with Supabase even if the user logs in or out in another tab, or if the token is refreshed. It's a safety net.
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

    // CLeanup subscription: The subscription is unsubscribed when the component unmounts to prevent memory leaks.
    return () => subscription.unsubscribe;
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
