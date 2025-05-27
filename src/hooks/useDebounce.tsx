import { useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  cb: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
