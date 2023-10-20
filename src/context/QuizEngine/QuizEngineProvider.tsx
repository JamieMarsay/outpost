"use client";

import React, { ReactNode, createContext, useReducer } from "react";
import { randomImageGenerator } from "@/utils/randomImageGenerator";

export const QuizEnginecontext = createContext({});

const testQuizzes = [
  {
    id: "1",
    title: "Maths quiz",
    description: "A quiz about maths",
    author: "John Doe",
    favourite: false,
    questions: [
      {
        id: "1",
        title: "This is a question about multiplication",
        preview: randomImageGenerator(),
      },
      {
        id: "2",
        title: "This is a question about subtraction",
        preview: randomImageGenerator(),
      },
      {
        id: "3",
        title: "This is a question about division",
        preview: randomImageGenerator(),
      },
    ],
  },
  {
    id: "2",
    title: "Science quiz",
    description: "A quiz about science",
    author: "John Doe",
    favourite: false,
    questions: [
      {
        id: "1",
        title: "This is a question about biology",
        preview: randomImageGenerator(),
      },
    ],
  },
];

const quizReducer = (state, action) => {
  switch (action.type) {
    // Toggles various features of the studio on/off
    case "SET_MODE":
      return {
        ...state,
        mode: action.data,
      };

    // Updates the current quiz once the user saves their changes
    case "EDIT_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.map((quiz) =>
          quiz.id === action.data.id ? { ...quiz, ...action.data } : quiz
        ),
      };

    // Stores the new quiz in state
    case "CREATE_QUIZ":
      return {
        ...state,
        quizzes: [...state.quizzes, action.data],
      };

    // case "ADD_QUESTION": {
    //   return {
    //     ...state,
    //     selectedQuiz: {
    //       ...state.selectedQuiz,
    //       questions: [...state.selectedQuiz.questions, action.data],
    //     },
    //   };
    // }
  }
};

export const QuizEngineProvider = ({ children }: { children: ReactNode }) => {
  const [quizEngineState, quizEngineDispatch] = useReducer(quizReducer, {
    quizzes: testQuizzes,
    selectedQuiz: {},
    previewMode: false,
    selectedQuestion: {},
    mode: "VIEW",
  });

  const toggleQuizEngineMode = () => {
    if (quizEngineState.mode === "VIEW") {
      quizEngineDispatch({
        type: "SET_MODE",
        data: "EDIT",
      });
    } else if (quizEngineState.mode === "EDIT" || "CREATE") {
      quizEngineDispatch({
        type: "SET_MODE",
        data: "VIEW",
      });
    }
  };

  return (
    <QuizEnginecontext.Provider
      value={{ quizEngineState, quizEngineDispatch, toggleQuizEngineMode }}
    >
      {children}
    </QuizEnginecontext.Provider>
  );
};
