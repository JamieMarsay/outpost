import Image from "next/image";
import React from "react";

const QuestionPreview = ({ selectedQuestion }) => {
  return (
    <div>
      <h2>{selectedQuestion.title}</h2>
      <Image width={500} height={500} src={selectedQuestion.preview} />
    </div>
  );
};

export default QuestionPreview;
