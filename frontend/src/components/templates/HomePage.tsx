import React from "react";
import MainTemplate from "../pages/MainTemplate";
import Form from "../molecules/Form";

const HomePage: React.FC = () => {
  return (
    <MainTemplate>
      <h2>Home Page</h2>
      <Form />
    </MainTemplate>
  );
};

export default HomePage;
