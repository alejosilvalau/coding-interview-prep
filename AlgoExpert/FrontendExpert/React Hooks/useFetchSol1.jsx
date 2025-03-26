import { useState, useEffect } from "react";

function useFetch(url) {
  const [responseJSON, setResponseJSON] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let shouldCancel = false;

    const callFetch = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const responseJSON = await response.json();

        if (shouldCancel) return;
        setResponseJSON(responseJSON);
        setIsLoading(false);
      } catch (newError) {
        if (shouldCancel) return;
        setError(newError);
        setResponseJSON(null);
      }

      setIsLoading(false);
    };

    callFetch();

    return () => (shouldCancel = true);
  }, [url]);

  return { responseJSON, isLoading, error };
}

exports.useFetch = useFetch;
