import { useRef, useEffect } from "react";

function useInterval(callback, delay) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;

    const intervalID = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(intervalID);
  }, [delay]);
}

exports.useInterval = useInterval;
