import {useEffect} from "react";

export default function useDropdownOutside(refMap, closeCallback) {

  useEffect(() => {

    const handler = e => {
      const dropdowns = refMap.current || {};

      const insideDropdown = Object.values(dropdowns).some(
        ref => ref?.contains(e.target)
      );

      const isButton = e.target.closest(".filters__button");

      if (!insideDropdown && !isButton) {
        closeCallback?.();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);

  }, [refMap, closeCallback]);
}