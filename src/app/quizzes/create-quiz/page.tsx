"use client";

import React, { useEffect, useContext } from "react";
import QuizStudio from "@/components/QuizStudio/QuizStudio";
import { QuizEnginecontext } from "../../../context/QuizEngine/QuizEngineProvider";

const CreateQuiz = ({}) => {
  const { quizEngineDispatch } = useContext(QuizEnginecontext);

  const newQuiz = {
    title: "",
    description: "",
    questions: [],
    id: Math.ceil(Math.random() * 1000).toString(),
  };

  useEffect(() => {
    quizEngineDispatch({
      type: "SET_MODE",
      data: "CREATE",
    });
  }, []);

  return <QuizStudio quiz={newQuiz} />;
};

export default CreateQuiz;
