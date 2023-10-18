"use client";

import React, { useContext } from "react";
import { QuizEnginecontext } from "../../../../context/QuizEngine/QuizEngineProvider";
import QuizStudio from "@/components/QuizStudio/QuizStudio";
import { useRouter } from "next/navigation";

const Page = () => {
  const { quizEngineState } = useContext(QuizEnginecontext);
  const { selectedQuiz } = quizEngineState;
  const router = useRouter();

  if (!selectedQuiz.questions) {
    router.push("/quizzes");
  }

  return (
    <div>
      {selectedQuiz?.questions ? (
        <QuizStudio quiz={selectedQuiz} />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Page;
