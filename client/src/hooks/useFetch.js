import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(endpoint).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [endpoint]);

  return { data, loading };
};

export default useFetch;
