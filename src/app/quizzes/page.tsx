"use client";

import React, { useContext, useEffect } from "react";
import { QuizEnginecontext } from "../../context/QuizEngine/QuizEngineProvider";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon/Icon";
import Link from "next/link";

const Quizzes = () => {
  const { quizEngineState, quizEngineDispatch } = useContext(QuizEnginecontext);
  const { quizzes } = quizEngineState;
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl mr-2">Quizzes</h1>
        <Link className="flex items-center" href="quizzes/create-quiz">
          <Icon name="edit" className="mr-2" />
          Create a new quiz
        </Link>
      </div>
      <div className="grid grid-cols-12">
        {quizzes.map((quiz) => (
          <div key={quiz.id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.questions.length} questions</p>
            <Link href={`/quizzes/view-quiz/${quiz.id}`}>View quiz</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
