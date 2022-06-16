import { projectAuth } from "../firebase/config";
import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
export default function useLogin() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setError(null);
    setIsPending(false);
    try {
      setIsPending(true);
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res) throw Error("could not complete the login");
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { login, error, isPending };
}
