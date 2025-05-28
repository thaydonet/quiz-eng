import React from 'react';
import { Test } from '../../types';
import { Clock, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

interface TestInstructionsProps {
  test: Test;
  onStart: () => void;
}

const TestInstructions: React.FC<TestInstructionsProps> = ({ test, onStart }) => {
  // Count total questions
  const totalQuestions = test.sections.reduce(
    (total, section) => total + section.questions.length, 
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-800 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">{test.title}</h1>
          <p className="mt-1 text-blue-100">{test.description}</p>
        </div>
        
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <Clock className="h-6 w-6 text-blue-800 mr-3 mt-1" />
              <div>
                <h3 className="font-bold text-blue-800">Time Limit</h3>
                <p className="text-blue-700">{test.timeLimit} minutes</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <BookOpen className="h-6 w-6 text-blue-800 mr-3 mt-1" />
              <div>
                <h3 className="font-bold text-blue-800">Questions</h3>
                <p className="text-blue-700">{totalQuestions} questions</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <AlertTriangle className="h-6 w-6 text-blue-800 mr-3 mt-1" />
              <div>
                <h3 className="font-bold text-blue-800">Difficulty</h3>
                <p className="text-blue-700">{test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-4">Test Instructions</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <p className="text-gray-700">This test contains {test.sections.length} sections with a total of {totalQuestions} multiple-choice questions.</p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <p className="text-gray-700">You have {test.timeLimit} minutes to complete the entire test. A timer will be displayed to help you manage your time.</p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <p className="text-gray-700">Each question has 4 options (A, B, C, D). Select the one option that best answers the question.</p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <p className="text-gray-700">You can navigate between questions and sections using the navigation panel.</p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <p className="text-gray-700">You can review and change your answers at any time before submitting the test.</p>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <p className="text-gray-700">After submitting, you will see your results and explanations for each question.</p>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-3">Sections</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <ul className="space-y-3">
              {test.sections.map((section) => (
                <li key={section.id} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-3">
                    {test.sections.findIndex(s => s.id === section.id) + 1}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">{section.title}</h4>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onStart}
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;