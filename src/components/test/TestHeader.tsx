import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TestHeaderProps {
  title: string;
  sectionTitle: string;
  questionsAnswered: number;
  totalQuestions: number;
}

const TestHeader: React.FC<TestHeaderProps> = ({ 
  title, 
  sectionTitle,
  questionsAnswered,
  totalQuestions 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex items-center">
        <Link to="/tests" className="mr-4 text-blue-800 hover:text-blue-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600">Section: {sectionTitle}</p>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 bg-white shadow-sm rounded-full px-4 py-2 flex items-center">
        <span className="text-sm font-medium text-gray-700">
          Progress: {questionsAnswered}/{totalQuestions} answered
        </span>
        <div className="ml-3 w-24 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-800 h-2 rounded-full" 
            style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;