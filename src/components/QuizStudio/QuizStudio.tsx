"use client";

import React, { useEffect, useContext, useState } from "react";
import QuestionsList from "./QuestionsList/QuestionsList";
import QuestionPreview from "./QuestionPreview/QuestionPreview";
import { useRouter } from "next/navigation";
import { Icon } from "../Icon/Icon";
import { QuizEnginecontext } from "../../context/QuizEngine/QuizEngineProvider";

const QuizStudio = ({ quiz }) => {
  const { quizEngineState, quizEngineDispatch, toggleQuizEngineMode } =
    useContext(QuizEnginecontext);
  const router = useRouter();
  const [quizState, setQuizState] = useState(quiz);

  const { mode } = quizEngineState;

  const handleQuizChanges = () => {
    if (mode === "CREATE") {
      quizEngineDispatch({ type: "CREATE_QUIZ", data: quizState });
    } else if (mode === "EDIT") {
      quizEngineDispatch({ type: "EDIT_QUIZ", data: quizState });
    }
  };

  console.log(quizState);

  return (
    <div>
      <h1>CURRENT ENGINE MODE: {mode}</h1>
      <div className="flex justify-between">
        <span className="mb-2">
          <input
            placeholder="Quiz title"
            onChange={(e) =>
              setQuizState((prev: any) => ({ ...prev, title: e.target.value }))
            }
            disabled={mode === "VIEW"}
            className="bg-transparent border-b-2 border-black p-2"
            value={quizState.title}
          />
          {mode !== "VIEW" && <Icon name="edit" />}
        </span>
        <div className="flex">
          <button className="mr-2 flex items-center">
            <Icon className="mr-1" name="image" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => {
              handleQuizChanges();
              toggleQuizEngineMode();
            }}
            className="mr-2 flex items-center"
          >
            <Icon className="mr-1" name={mode === "VIEW" ? "edit" : "save"} />

            <span>{mode === "VIEW" ? "Edit quiz" : "Save changes"}</span>
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
        <QuestionPreview
          questions={quizState.questions}
          setQuizState={setQuizState}
        />
      </div>
    </div>
  );
};

export default QuizStudio;
