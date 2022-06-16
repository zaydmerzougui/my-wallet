import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(false);
    try {
      setIsPending(true);
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) throw Error("could not complete the signup");
      dispatch({ type: "LOGIN", payload: res.user });
      res.user.updateProfile({ displayName });
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
  return { error, isPending, signup };
}
