import React from 'react';
import { Question } from '../../types';
import { useTest } from '../../contexts/TestContext';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ 
  question, 
  questionNumber,
  totalQuestions
}) => {
  const { userAnswers, addUserAnswer } = useTest();
  const userAnswer = userAnswers.find(a => a.questionId === question.id);
  
  const handleSelectOption = (optionIndex: number) => {
    const optionLetter = String.fromCharCode(65 + optionIndex); // Convert to A, B, C, D
    addUserAnswer(question.id, optionLetter);
  };
  
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Question {questionNumber} of {totalQuestions}
        </h3>
        <span className="text-sm text-gray-500">
          {userAnswer ? 'Answered' : 'Not answered'}
        </span>
      </div>
      
      <div className="text-base text-gray-700 whitespace-pre-line mb-6">
        {question.text}
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = userAnswer?.answer === optionLetter;
          
          return (
            <div 
              key={index}
              onClick={() => handleSelectOption(index)}
              className={`
                p-4 border rounded-lg cursor-pointer flex items-start transition-colors
                ${isSelected 
                  ? 'border-blue-800 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
              `}
            >
              <div className={`
                flex items-center justify-center w-6 h-6 rounded-full mr-3 flex-shrink-0
                ${isSelected ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700'}
              `}>
                {optionLetter}
              </div>
              <div className="text-gray-700">{option}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionDisplay;