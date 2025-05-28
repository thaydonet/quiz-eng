import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTestSummaries } from '../services/testService';
import { TestSummary } from '../types';
import { Clock, BookOpen, BarChart2, Loader } from 'lucide-react';

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  let bgColor;
  switch (difficulty) {
    case 'easy':
      bgColor = 'bg-green-100 text-green-800';
      break;
    case 'medium':
      bgColor = 'bg-yellow-100 text-yellow-800';
      break;
    case 'hard':
      bgColor = 'bg-red-100 text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
};

const TestSelectionPage = () => {
  const [tests, setTests] = useState<TestSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const testSummaries = await fetchTestSummaries();
        setTests(testSummaries);
        setError(null);
      } catch (err) {
        setError('Failed to load tests. Please try again later.');
        console.error('Error loading tests:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTests();
  }, []);

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || test.difficulty === difficultyFilter;
    
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Practice Tests
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Choose from our collection of THPT English practice tests to start preparing for your exam.
        </p>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="w-full sm:w-64">
          <label htmlFor="search" className="sr-only">Search tests</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
              placeholder="Search tests"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          <label htmlFor="difficulty" className="sr-only">Filter by difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm rounded-md"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-blue-800 animate-spin" />
          <span className="ml-2 text-lg text-gray-600">Loading tests...</span>
        </div>
      ) : error ? (
        <div className="mt-8 text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTests.length > 0 ? (
            filteredTests.map(test => (
              <div
                key={test.id}
                className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-blue-200"
              >
                <div className="h-48 w-full relative">
                  <img
                    src={test.coverImage || "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg"}
                    alt={test.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <DifficultyBadge difficulty={test.difficulty} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{test.description}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{test.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{test.questionCount} questions</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      <span>{test.sections.length} sections</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to={`/test/${test.id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Start Test
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No tests found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestSelectionPage;