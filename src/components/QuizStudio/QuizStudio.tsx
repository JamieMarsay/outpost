"use client";

import React, { useEffect, useContext } from "react";
import QuestionsList from "./QuestionsList/QuestionsList";
import QuestionPreview from "./QuestionPreview/QuestionPreview";
import { useRouter } from "next/navigation";
import { Icon } from "../Icon/Icon";
import { QuizEnginecontext } from "../../context/QuizEngine/QuizEngineProvider";

const QuizStudio = ({ quiz }) => {
  const { title, questions } = quiz;
  const { quizEngineState, quizEngineDispatch } = useContext(QuizEnginecontext);
  const router = useRouter();

  useEffect(() => {
    // Set first question as default selected question
    quizEngineDispatch({
      type: "EDIT_QUESTION",
      data: questions[0],
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl">{title}</h1>
        <div className="flex">
          <button className="mr-2 flex items-center">
            <Icon className="mr-1" name="image" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => router.back()}
            className="mr-2 flex items-center"
          >
            <Icon className="mr-1" name="arrow_back" />
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="flex">
        <QuestionsList questions={questions} />
        <div className="flex-1">
          <QuestionPreview
            selectedQuestion={quizEngineState.selectedQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizStudio;
