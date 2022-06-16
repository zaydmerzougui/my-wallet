import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw Error("context must be used inside AuthContextProvider");
  return context;
}
