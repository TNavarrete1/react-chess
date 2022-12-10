import { useEffect, useState, useRef } from "react";

export default function useComponentVisible(isInitVisible, toggable) {
  const [isComponentVisible, setIsComponentVisible] = useState(isInitVisible);
  const ref = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        toggable &&
        toggleRef.current &&
        toggleRef.current.contains(e.target)
      ) {
        setIsComponentVisible((prev) => {
          return !prev;
        });
        return;
      }
      if (ref.current && !ref.current.contains(e.target)) {
        setIsComponentVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [toggable]);

  return { ref, toggleRef, isComponentVisible, setIsComponentVisible };
}
