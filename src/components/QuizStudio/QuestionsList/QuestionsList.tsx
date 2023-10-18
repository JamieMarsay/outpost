import React, { useContext } from "react";
import Image from "next/image";
import { Icon } from "../../Icon/Icon";
import { QuizEnginecontext } from "../../../context/QuizEngine/QuizEngineProvider";

const QuestionsList = ({ questions }) => {
  const { quizEngineDispatch } = useContext(QuizEnginecontext);

  return (
    <div className="flex flex-col w-28">
      <h2>{questions.length} Questions</h2>
      {questions.map((question) => (
        <div className="mb-2" key={question.id}>
          <button
            onClick={() =>
              quizEngineDispatch({ type: "EDIT_QUESTION", data: question })
            }
          >
            <Image
              width={100}
              height={100}
              src={question.preview}
              alt="A quiz question preview"
            />
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          quizEngineDispatch({
            type: "ADD_QUESTION",
            data: {
              id: `${questions.length + 1}`,
              title: "This is a new question",
              preview: "https://picsum.photos/200",
            },
          })
        }
        className="border-2 border-dashed border-black w-[100px] h-[100px]"
      >
        <Icon name="add" />
      </button>
    </div>
  );
};

export default QuestionsList;
