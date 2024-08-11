import React, { ReactNode } from "react";
import Header from "../organisms/Header";

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainTemplate;
