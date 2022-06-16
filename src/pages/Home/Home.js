import TransactionList from "../../components/TransactionList";
import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
export default function Home() {
  const { user } = useAuthContext();
  const { data, error } = useCollection(
    "transaction",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error} </p>}
        {data && <TransactionList transactions={data} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
