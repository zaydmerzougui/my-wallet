// styles
import useFirestore from "../hooks/useFirestore";
import styles from "../pages/Home/Home.module.css";
export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("transaction");

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>$ {transaction.amount} </p>
          <button onClick={() => deleteDocument(transaction.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
