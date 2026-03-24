


import { useEffect } from "react";

const Form = () => {
  useEffect(() => {
    // Check if the Flodesk library is available
    if (!window.fd) {
      console.warn("Flodesk library not loaded yet. Ensure the script is included.");
      return;
    }

    // Initialize Flodesk form
    window.fd("form", {
      formId: "656c1593717e716ed03eba7c",
      containerEl: "#fd-form-656c1593717e716ed03eba7c",
    });
  }, []);




  return (
    <div className="w-full">
      {/* Container for the Flodesk form */}
      <div id="fd-form-656c1593717e716ed03eba7c" className="p-0"></div>
    </div>
  );
};

export default Form;

