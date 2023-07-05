import { useState, useEffect } from "react";

const useDebounce = (cityInput: string) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(cityInput);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [cityInput]);
  return debouncedInputValue;
};
export default useDebounce;
