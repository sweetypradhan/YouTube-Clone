import { useState, useEffect } from 'react';

const useFetch = (url, method, bodyData, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bodyData) return; // Don't execute if bodyData is not available

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `JWT ${token}` : undefined, // Include token if provided
          },
          body: JSON.stringify(bodyData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, bodyData, token]);

  return { data, loading, error };
};

export default useFetch;
