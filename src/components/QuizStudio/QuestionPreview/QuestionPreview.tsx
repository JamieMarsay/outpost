"use client";

import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { QuizEnginecontext } from "../../../context/QuizEngine/QuizEngineProvider";
import { Icon } from "../../Icon/Icon";
import { randomImageGenerator } from "@/utils/randomImageGenerator";

const QuestionPreview = ({ questions, setQuizState }) => {
  const { quizEngineState, quizEngineDispatch } = useContext(QuizEnginecontext);
  const { mode } = quizEngineState;
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [questionCategory, setQuestionCategory] = useState({
    title: "Science",
    questionTypes: [],
  });
  const [addingNewQuestion, toggleAddingNewQuestion] = useState(false);

  const addNewQuestion = (questionToAdd) => {
    // Add new question to quiz
    setQuizState((prev: any) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          ...questionToAdd,
          id: `${prev.questions.length + 1}`,
        },
      ],
    }));
  };

  const deleteQuestion = () => {
    // Delete question from quiz
    setQuizState((prev: any) => ({
      ...prev,
      questions: prev.questions.filter(
        (question) => question.id !== selectedQuestion.id
      ),
    }));
  };

  console.log(questions, selectedQuestion);

  // useEffect(() => {
  //   if (questions.length === 0) {
  //     // Create new question
  //     setQuizState((prev: any) => ({
  //       ...prev,
  //       questions: [blankQuestion],
  //     }));
  //     setSelectedQuestion(blankQuestion);
  //   }
  // }, []);

  const questionTypes = {
    Science: [
      {
        title: "A question about biology",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about chemistry",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about physics",
        preview: randomImageGenerator(),
      },
    ],
    Maths: [
      {
        title: "A question about addition",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about subtraction",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about multiplication",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about division",
        preview: randomImageGenerator(),
      },
    ],
    Geography: [
      {
        title: "A question about languages",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about countries",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about flags",
        preview: randomImageGenerator(),
      },
      {
        title: "A question about cultures",
        preview: randomImageGenerator(),
      },
    ],
  };

  useEffect(() => {
    if (questions.length === 0) {
      setSelectedQuestion({});
    } else {
      setSelectedQuestion(questions[0]);
    }
  }, [questions.length]);

  return (
    <div className="flex">
      <div className="flex flex-col w-28 ">
        <h2>{questions.length} Questions</h2>
        {mode !== "VIEW" && (
          <button
            onClick={() => toggleAddingNewQuestion(!addingNewQuestion)}
            className="mb-2 border-2 border-dashed border-black w-[100px] h-[100px]"
          >
            <Icon name="add" />
          </button>
        )}
        <div className="max-h-[50vh] overflow-scroll">
          {questions.map((question) => (
            <div className="mb-2" key={question.id}>
              <button onClick={() => setSelectedQuestion(question)}>
                <Image
                  width={100}
                  height={100}
                  src={question.preview}
                  alt="A quiz question preview"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        {selectedQuestion?.preview && (
          <>
            <div className="flex  items-center justify-between">
              <p className="mr-6">{selectedQuestion.title}</p>
              {mode !== "VIEW" && (
                <button
                  className="flex items-center"
                  onClick={() => deleteQuestion()}
                >
                  <Icon name="delete" className="mr-2" />
                  <span>Delete question</span>
                </button>
              )}
            </div>
            <Image
              width={100}
              height={100}
              src={selectedQuestion.preview}
              alt="A quiz question preview"
            />
          </>
        )}

        <div className="flex flex-col">
          {addingNewQuestion && mode !== "VIEW" && (
            <div className="bg-black/20 h-screen w-screen fixed left-0 top-0 flex items-center justify-center">
              <dialog open={addingNewQuestion} className="p-2 w-[50vh]">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl mb-2">Adding new questions</h2>
                  <button
                    className="flex items-center"
                    onClick={() => toggleAddingNewQuestion(!addNewQuestion)}
                  >
                    <Icon name="save" className="mr-2" />
                    <span>Save questions</span>
                  </button>
                </div>
                <h3 className="mb-2">Questions by category</h3>
                <div className="flex border-b-2 border-black mb-2">
                  {Object.keys(questionTypes).map((q) => (
                    <button
                      key={q}
                      className="mr-2"
                      onClick={() =>
                        setQuestionCategory({
                          title: q,
                          questionTypes: questionTypes[q],
                        })
                      }
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3">
                  {questionCategory.questionTypes.map((question) => (
                    <div key={question.title} className="mr-2">
                      <p>{question.title}</p>
                      <Image
                        width={100}
                        height={100}
                        src={question.preview}
                        alt="A quiz question preview"
                      />
                      <button onClick={() => addNewQuestion(question)}>
                        Add question
                      </button>
                    </div>
                  ))}
                </div>
              </dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPreview;
