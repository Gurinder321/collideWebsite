
"use client"

import { useEffect } from "react";

const PopUp = () => {

  useEffect(() => {
        if (!window.fd) {
          console.warn("Flodesk library not loaded yet. Ensure the script is included.");
          return;
        }
  
        window.fd("form", {
          formId: "67440591b07487ef6f47fd1e",
          containerEl: "#fd-form-67440591b07487ef6f47fd1e",
        });
   
  }, []);


  return (
    <div className="w-full relative">
      <div id="fd-form-67440591b07487ef6f47fd1e" className="z-50"></div>
    </div>
  );
};

export default PopUp;

