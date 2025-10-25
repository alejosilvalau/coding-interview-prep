import { useState, useCallback } from "react";

function useMap(initialMap) {
  const [map, setMap] = useState(new Map(initialMap));

  const set = useCallback((key, value) => {
    setMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const del = useCallback(key => {
    setMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  return { map, set, delete: del, clear };
}

exports.useMap = useMap;
