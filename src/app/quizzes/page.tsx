"use client";

import React, { useContext } from "react";
import { QuizEnginecontext } from "../../context/QuizEngine/QuizEngineProvider";
import { useRouter } from "next/navigation";

const Quizzes = () => {
  const { quizEngineState, quizEngineDispatch } = useContext(QuizEnginecontext);
  const { quizzes } = quizEngineState;
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center mb-2">
        <h1 className="text-xl mr-2">Quizzes</h1>
        <button>create quiz</button>
      </div>
      <div className="grid grid-cols-12">
        {quizzes.map((quiz) => (
          <div className="" key={quiz.id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button
              onClick={() => {
                quizEngineDispatch({
                  type: "EDIT_QUIZ",
                  data: quiz.id,
                });
                router.push(`/quizzes/edit-quiz/${quiz.id}`);
              }}
            >
              View quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
