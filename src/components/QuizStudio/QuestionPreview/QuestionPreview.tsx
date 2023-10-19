"use client";

import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { QuizEnginecontext } from "../../../context/QuizEngine/QuizEngineProvider";
import { Icon } from "../../Icon/Icon";

const QuestionPreview = ({ questions, setQuizState }) => {
  const { quizEngineState, quizEngineDispatch, toggleQuizEngineMode } =
    useContext(QuizEnginecontext);
  const { mode } = quizEngineState;
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);

  const blankQuestion = {
    id: `${questions.length}`,
    title: "",
    preview: "https://picsum.photos/200",
  };

  const addNewQuestion = () => {
    // Create new question
    setQuizState((prev: any) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: `${prev.questions.length + 1}`,
          title: selectedQuestion?.title,
          preview: "https://picsum.photos/200",
        },
      ],
    }));
  };
  console.log(questions, selectedQuestion);

  useEffect(() => {
    if (questions.length === 0) {
      // Create new question
      setQuizState((prev: any) => ({
        ...prev,
        questions: [blankQuestion],
      }));
      setSelectedQuestion(blankQuestion);
    }
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col w-28">
        <h2>{questions.length} Questions</h2>
        {questions.map((question) => (
          <div className="mb-2" key={question.id}>
            <button>
              <Image
                width={100}
                height={100}
                src={question.preview}
                alt="A quiz question preview"
              />
            </button>
          </div>
        ))}

        {mode !== "VIEW" && (
          <button
            onClick={() => addNewQuestion()}
            className="border-2 border-dashed border-black w-[100px] h-[100px]"
          >
            <Icon name="add" />
          </button>
        )}
      </div>
      <div className="flex-1">
        <span className="mb-2 flex items-center">
          <input
            placeholder="Enter a question title"
            onChange={(e) =>
              setSelectedQuestion((prev: any) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            disabled={mode === "VIEW"}
            className="bg-transparent border-b-2 border-black p-2 w-[100%]"
            value={selectedQuestion?.title}
          />
          {mode !== "VIEW" && <Icon name="edit" />}
        </span>
        {selectedQuestion?.preview && (
          <Image
            width={500}
            height={500}
            src={selectedQuestion.preview}
            alt="A question preview"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionPreview;
