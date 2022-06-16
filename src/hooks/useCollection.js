import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";
export default function useCollection(collection, _query, _orderBy) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  // if we don't use a ref==> infinite loop in useEffect
  //_query is an array and is 'different' on evry function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    setIsPending(true);
    let ref = projectFirestore.collection(collection);
    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }
    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (!snapshot.empty) {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });
          setData(result);
          setError(null);
          setIsPending(false);
        } else {
          setError("no docs to load");
          setIsPending(false);
          setData([]);
        }
      },
      (err) => {
        setError("could not fetch the data");
        console.log(err.message);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, [collection, query, orderBy]);
  return { error, isPending, data };
}
