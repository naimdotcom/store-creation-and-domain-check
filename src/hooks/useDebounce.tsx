import { useRef } from "react";
// ?source stackoverflow: https://stackoverflow.com/questions/77123890/debounce-in-reactjs

export function useDebounce<T extends (...args: never[]) => void>(
  cb: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      void cb(...args); // ignore the async return value
    }, delay);
  };
}
