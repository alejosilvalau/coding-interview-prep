import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue == null) {
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
    return savedValue;
  });

  const setValueAndLocalStorage = newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setValueAndLocalStorage];
}

exports.useLocalStorage = useLocalStorage;
