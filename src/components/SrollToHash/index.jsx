// components/ScrollToHash.js
import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return null;
}
