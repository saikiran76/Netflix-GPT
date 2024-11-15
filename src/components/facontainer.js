import React from "react"
import { FaPlus } from "react-icons/fa";


const FaContainer = () => {

  // array of faqs
  const questions = [
    { question: "Do you offer free tier?", plusIcon: <FaPlus /> },
    { question: "What’s the guarantee that I will be satisfied with the app?", plusIcon: <FaPlus /> },
    { question: "What are the features of the application", plusIcon: <FaPlus />, answer: "FlixyAI is a comprehensive movie recommendation application that offers a seamless and interactive user experience. Users can explore and manage their movie preferences through various features such as a GPT-powered search for personalized movie recommendations, auth-based navigation with options to sign in or continue as a guest, and a dynamic bucket list to store favorite movies." },
    { question: "Why should I use it?", plusIcon: <FaPlus /> },
    { question: "How Ai is being used?", plusIcon: <FaPlus /> }
  ];


  return (
    <div className="w-[90%] md:w-[1200px] lg:md-[1200px] h-[660px] md:h-[512px] bg-[#050F0F]
     flex flex-col md:flex md:flex-row lg:flex lg:flex-row gap-0 md:gap-9 lg:gap-9 mx-auto rounded-3xl">
      <div className="flex flex-col pt-12 md:pt-16 pl-6 md:pl-24">
        <h1 className="font-grace text-lg text-gray-300">Whats in your mind</h1>
        <h1 className="font-man text-3xl font-semibold text-gray-300">Ask Questions</h1>
      </div>

      <div className="pl-9 md:pl-12 pt-4 h-[25rem] md:pt-12 lg:pt-12 lg:m-auto md:m-auto mt-4">
        <div className="flex flex-col justify-start items-start gap-9 w-[90%] md:w-[581px] h-[70%] md:h-[512px] lg:h-[400px] box-border">
          {questions.map((question, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col justify-start items-start gap-6 w-[100%] box-border">
                <div className="flex flex-row justify-between items-center gap-6 w-[100%] box-border">
                  <p className="border-[#1c1c1cff] text-sm leading-[140%] text-gray-300 font-man font-[600]">
                    {question.question}
                  </p>
                  {question.plusIcon}
                </div>
                {question.answer && (
                  <p className="border-[#617275ff] text-gray-300 text-[15px] leading-[160%] font-man font-[400]">
                    {question.answer}
                  </p>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaContainer;