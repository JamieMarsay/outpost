import React from "react";
import { QuizEngineProvider } from "../../context/QuizEngine/QuizEngineProvider";

const layout = ({ children }) => {
  return (
    <QuizEngineProvider>
      <div className="p-63">{children}</div>
    </QuizEngineProvider>
  );
};

export default layout;
