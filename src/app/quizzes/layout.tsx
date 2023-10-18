import React from "react";
import { QuizEngineProvider } from "../../context/QuizEngine/QuizEngineProvider";

const layout = ({ children }) => {
  return (
    <QuizEngineProvider>
      <div className="p-6">{children}</div>
    </QuizEngineProvider>
  );
};

export default layout;
