import { projectAuth } from "../firebase/config";
import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
export default function useLogout() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setIsPending(false);
    try {
      setIsPending(true);
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });
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
  });
  return { logout, error, isPending };
}
