import React from "react";
import Button from "../atoms/Button";

const Form: React.FC = () => {
  const handleSubmit = () => {
    alert("Form submitted");
  };

  return (
    <form>
      <input type="text" placeholder="Enter text" />
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
};

export default Form;
