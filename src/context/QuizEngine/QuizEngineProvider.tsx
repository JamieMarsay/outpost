"use client";

import React, { ReactNode, createContext, useReducer } from "react";

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
        preview: "https://picsum.photos/200",
      },
      {
        id: "2",
        title: "This is a question about subtraction",
        preview: "https://picsum.photos/200",
      },
      {
        id: "3",
        title: "This is a question about division",
        preview: "https://picsum.photos/200",
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
        preview: "https://picsum.photos/200",
      },
    ],
  },
];

const quizReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_QUIZ":
      return {
        ...state,
        selectedQuiz: state.quizzes.find((quiz) => quiz.id === action.data),
      };

    case "CREATE_QUIZ":
      console.log("quiz created");

    case "EDIT_QUESTION":
      return {
        ...state,
        selectedQuestion: action.data,
      };

    case "ADD_QUESTION": {
      return {
        ...state,
        selectedQuiz: {
          ...state.selectedQuiz,
          questions: [...state.selectedQuiz.questions, action.data],
        },
      };
    }
  }
};

export const QuizEngineProvider = ({ children }: { children: ReactNode }) => {
  const [quizEngineState, quizEngineDispatch] = useReducer(quizReducer, {
    quizzes: testQuizzes,
    selectedQuiz: {},
    previewMode: false,
    selectedQuestion: {},
  });

  console.log(quizEngineState);

  return (
    <QuizEnginecontext.Provider value={{ quizEngineState, quizEngineDispatch }}>
      {children}
    </QuizEnginecontext.Provider>
  );
};
