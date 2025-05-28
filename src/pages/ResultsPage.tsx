import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTest } from '../contexts/TestContext';
import { ArrowLeft, CheckCircle, XCircle, Download, BarChart, Printer } from 'lucide-react';
import { Question, TestResult } from '../types';
import ResultsChart from '../components/results/ResultsChart';

const ResultsPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { currentTest, testResults, userAnswers } = useTest();
  const [selectedSection, setSelectedSection] = useState<string | 'all'>('all');
  const [showExplanations, setShowExplanations] = useState(false);

  const result = testResults.find(r => r.testId === testId);

  useEffect(() => {
    if (!currentTest && !result) {
      navigate('/tests');
    }
  }, [currentTest, result, navigate]);

  if (!currentTest || !result) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Loading results...</h2>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const getSectionQuestions = (sectionId: string) => {
    const section = currentTest.sections.find(s => s.id === sectionId);
    return section ? section.questions : [];
  };

  const getQuestionsToShow = () => {
    if (selectedSection === 'all') {
      return currentTest.sections.flatMap(section => section.questions);
    } else {
      return getSectionQuestions(selectedSection);
    }
  };

  const getQuestionResult = (question: Question) => {
    const userAnswer = userAnswers.find(a => a.questionId === question.id);
    return {
      answered: !!userAnswer,
      userAnswer: userAnswer?.answer || '',
      isCorrect: userAnswer?.answer === question.correctAnswer
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <div className="flex items-center">
            <Link to="/tests" className="mr-4 text-blue-800 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{currentTest.title} Results</h1>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Completed on {new Date(result.completedAt).toLocaleString()}
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">{result.score}/10</h2>
                <p className="mt-1 text-sm text-gray-600">
                  {result.correctAnswers} of {result.totalQuestions} Questions Correct
                </p>
              </div>
              
              <div className="mt-6">
                <ResultsChart 
                  sectionScores={result.sectionScores} 
                  testSections={currentTest.sections} 
                />
              </div>
              
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-gray-900">Section Scores</h3>
                {Object.entries(result.sectionScores).map(([sectionId, score]) => {
                  const section = currentTest.sections.find(s => s.id === sectionId);
                  if (!section) return null;
                  
                  const percentage = Math.round((score.correct / score.total) * 100);
                  let bgColor;
                  if (percentage >= 80) bgColor = 'bg-green-500';
                  else if (percentage >= 60) bgColor = 'bg-yellow-500';
                  else bgColor = 'bg-red-500';
                  
                  return (
                    <div key={sectionId} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">{section.title}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {score.correct}/{score.total}
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${bgColor} h-2 rounded-full`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4">
              <div className="flex justify-between">
                <Link 
                  to={`/test/${testId}`}
                  className="text-sm font-medium text-blue-800 hover:text-blue-600"
                >
                  Retake Test
                </Link>
                <Link 
                  to="/tests"
                  className="text-sm font-medium text-blue-800 hover:text-blue-600"
                >
                  Practice More
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">Question Review</h3>
                  <div className="ml-4">
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm rounded-md"
                    >
                      <option value="all">All Sections</option>
                      {currentTest.sections.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowExplanations(!showExplanations)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 divide-y divide-gray-200">
              {getQuestionsToShow().map((question, index) => {
                const { answered, userAnswer, isCorrect } = getQuestionResult(question);
                
                return (
                  <div key={question.id} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Question {index + 1}
                        </div>
                        <div className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                          {question.text}
                        </div>
                        
                        <div className="mt-3 space-y-2">
                          {question.options.map((option, optIndex) => {
                            const optionLabel = String.fromCharCode(65 + optIndex); // A, B, C, D
                            const isUserAnswer = userAnswer === optionLabel;
                            const isCorrectAnswer = question.correctAnswer === optionLabel;
                            
                            let optionClass = 'border border-gray-200 bg-white';
                            if (isUserAnswer && isCorrectAnswer) {
                              optionClass = 'border-green-500 bg-green-50';
                            } else if (isUserAnswer && !isCorrectAnswer) {
                              optionClass = 'border-red-500 bg-red-50';
                            } else if (isCorrectAnswer) {
                              optionClass = 'border-green-500 bg-white';
                            }
                            
                            return (
                              <div 
                                key={optIndex} 
                                className={`${optionClass} rounded-md p-3 flex items-center`}
                              >
                                <div className="flex-shrink-0 w-6 text-gray-800 font-medium">
                                  {optionLabel}.
                                </div>
                                <div className="ml-2 text-sm text-gray-700">{option}</div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {showExplanations && (
                          <div className="mt-4 bg-blue-50 p-3 rounded-md">
                            <h4 className="text-sm font-medium text-blue-800">Explanation</h4>
                            <p className="mt-1 text-sm text-blue-700">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;