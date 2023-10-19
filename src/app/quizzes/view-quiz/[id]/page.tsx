"use client";

import React, { useContext, useEffect, useState } from "react";
import { QuizEnginecontext } from "@/context/QuizEngine/QuizEngineProvider";
import QuizStudio from "@/components/QuizStudio/QuizStudio";

const Page = ({ params }) => {
  const { id } = params;
  const { quizEngineState, quizEngineDispatch } = useContext(QuizEnginecontext);
  const { quizzes } = quizEngineState;
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    quizEngineDispatch({
      type: "SET_MODE",
      data: "VIEW",
    });

    // Find the quiz we want, presumably this would be an API call?
    const fetchData = async () => {
      const data = await quizzes.find((quiz) => quiz.id === id);
      setSelectedQuiz(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? <p>loading...</p> : <QuizStudio quiz={selectedQuiz} />;
};

export default Page;
