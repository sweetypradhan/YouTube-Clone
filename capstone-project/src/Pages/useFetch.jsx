import { useState, useEffect } from 'react';

// State to store fetched data, loading status, and errors
const useFetch = (url, method, bodyData, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bodyData) return; // If bodyData is null, exit early to prevent unnecessary fetch calls.

    // Async function to handle data fetching
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Send the fetch request with provided URL, method, headers, and body.
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `JWT ${token}` : undefined, 
          },
          body: JSON.stringify(bodyData), // Convert body data to JSON format
        });

        // Parse the response data.
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setData(result); // Set the successful result.
      } catch (err) {
        setError(err.message);  // Set error message if fetch fails
      } finally {
        setLoading(false);  // End loading state
      }
    };

    fetchData();
  }, [url, method, bodyData, token]);   // Re-run effect if these dependencies change.

  return { data, loading, error };  // Return data, loading status, and error state for use in the component
};

export default useFetch;
