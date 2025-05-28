import React from 'react';
import { useTest } from '../contexts/TestContext';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Clock, 
  CheckCircle, 
  Calendar, 
  Award,
  TrendingUp,
  BookOpen,
  User
} from 'lucide-react';

const ProfilePage = () => {
  const { testResults } = useTest();
  
  // If no test results, show placeholder data
  const hasResults = testResults.length > 0;
  
  // Calculate stats
  const totalTests = testResults.length;
  const averageScore = hasResults
    ? (testResults.reduce((sum, result) => sum + result.score, 0) / totalTests).toFixed(1)
    : "0.0";
  
  const totalQuestions = hasResults
    ? testResults.reduce((sum, result) => sum + result.totalQuestions, 0)
    : 0;
  
  const correctAnswers = hasResults
    ? testResults.reduce((sum, result) => sum + result.correctAnswers, 0)
    : 0;
  
  const accuracy = totalQuestions > 0
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0;
  
  // Get best score
  const bestScore = hasResults
    ? Math.max(...testResults.map(result => result.score))
    : 0;
  
  // Sort tests by date (newest first)
  const sortedTests = [...testResults].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                  <User className="h-12 w-12" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">Student</h2>
                <p className="text-gray-500">THPT Student</p>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Tests Completed</p>
                    <p className="text-lg font-semibold text-gray-900">{totalTests}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Award className="h-5 w-5 text-blue-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Average Score</p>
                    <p className="text-lg font-semibold text-gray-900">{averageScore}/10</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Accuracy</p>
                    <p className="text-lg font-semibold text-gray-900">{accuracy}%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-blue-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Best Score</p>
                    <p className="text-lg font-semibold text-gray-900">{bestScore}/10</p>
                  </div>
                </div>
              </div>
              
              {!hasResults && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-4">You haven't taken any tests yet.</p>
                  <Link
                    to="/tests"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start Practicing
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Test History</h3>
            </div>
            
            {hasResults ? (
              <div className="divide-y divide-gray-200">
                {sortedTests.map((result) => (
                  <div key={result.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">{result.testName}</h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(result.completedAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{new Date(result.completedAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-right mr-6">
                          <p className="text-sm text-gray-500">Score</p>
                          <p className="text-lg font-bold text-gray-900">{result.score}/10</p>
                        </div>
                        
                        <Link
                          to={`/results/${result.testId}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      {Object.entries(result.sectionScores).map(([sectionId, score]) => {
                        const percentage = Math.round((score.correct / score.total) * 100);
                        let barColor;
                        
                        if (percentage >= 80) barColor = 'bg-green-500';
                        else if (percentage >= 60) barColor = 'bg-yellow-500';
                        else barColor = 'bg-red-500';
                        
                        // Find section name based on id
                        const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
                        
                        return (
                          <div key={sectionId} className="col-span-1">
                            <div className="flex justify-between items-center text-xs font-medium text-gray-700">
                              <span>{sectionName}</span>
                              <span>{score.correct}/{score.total}</span>
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`${barColor} h-1.5 rounded-full`} 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No test history</h3>
                <p className="mt-1 text-sm text-gray-500">Take some practice tests to see your results here.</p>
                <div className="mt-6">
                  <Link
                    to="/tests"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Browse Tests
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {hasResults && (
            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recommended Practice</h3>
              </div>
              
              <div className="px-6 py-4">
                <p className="text-sm text-gray-600 mb-4">
                  Based on your performance, we recommend you focus on these sections:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-800">Reading Comprehension</h4>
                    <p className="mt-1 text-sm text-blue-700">
                      Practice with more complex passages and focus on identifying main ideas and supporting details.
                    </p>
                    <div className="mt-3">
                      <Link
                        to="/tests"
                        className="text-sm font-medium text-blue-800 hover:text-blue-600"
                      >
                        View Reading Practice Tests →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-800">Grammar and Vocabulary</h4>
                    <p className="mt-1 text-sm text-blue-700">
                      Review conditional sentences and work on expanding your academic vocabulary.
                    </p>
                    <div className="mt-3">
                      <Link
                        to="/tests"
                        className="text-sm font-medium text-blue-800 hover:text-blue-600"
                      >
                        View Grammar Practice Tests →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;