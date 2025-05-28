import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTest } from '../contexts/TestContext';
import TestHeader from '../components/test/TestHeader';
import QuestionDisplay from '../components/test/QuestionDisplay';
import TestNavigation from '../components/test/TestNavigation';
import TestTimer from '../components/test/TestTimer';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import TestInstructions from '../components/test/TestInstructions';

const TestPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { 
    currentTest, 
    userAnswers, 
    isTestActive, 
    startTest, 
    finishTest,
    currentSection,
    setCurrentSection
  } = useTest();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Start test when page loads
    if (!currentTest && testId) {
      startTest(testId);
    }
  }, [testId, currentTest, startTest]);

  useEffect(() => {
    // Reset question index when section changes
    setCurrentQuestionIndex(0);
  }, [currentSection]);

  if (!currentTest) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const currentSectionData = currentTest.sections.find(section => section.id === currentSection);
  
  if (!currentSectionData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Section not found</h2>
          <p className="mt-2 text-gray-600">The requested section could not be found.</p>
          <button
            onClick={() => navigate('/tests')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  const handleStartTest = () => {
    setShowInstructions(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSectionData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentTest.sections.findIndex(s => s.id === currentSection) < currentTest.sections.length - 1) {
      // Move to next section
      const currentSectionIndex = currentTest.sections.findIndex(s => s.id === currentSection);
      const nextSection = currentTest.sections[currentSectionIndex + 1];
      setCurrentSection(nextSection.id);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Move to previous section's last question
      const currentSectionIndex = currentTest.sections.findIndex(s => s.id === currentSection);
      if (currentSectionIndex > 0) {
        const prevSection = currentTest.sections[currentSectionIndex - 1];
        setCurrentSection(prevSection.id);
        setCurrentQuestionIndex(prevSection.questions.length - 1);
      }
    }
  };

  const handleJumpToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    setCurrentQuestionIndex(0);
  };

  const handleJumpToQuestion = (sectionId: string, questionIndex: number) => {
    setCurrentSection(sectionId);
    setCurrentQuestionIndex(questionIndex);
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    try {
      const result = finishTest();
      if (result) {
        navigate(`/results/${testId}`);
      }
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total questions answered
  const questionsAnswered = userAnswers.length;
  const totalQuestions = currentTest.sections.reduce(
    (total, section) => total + section.questions.length, 
    0
  );

  // Display instructions screen if needed
  if (showInstructions) {
    return (
      <TestInstructions 
        test={currentTest} 
        onStart={handleStartTest} 
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <TestHeader 
        title={currentTest.title} 
        sectionTitle={currentSectionData.title}
        questionsAnswered={questionsAnswered}
        totalQuestions={totalQuestions}
      />
      
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <TestTimer />
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                {currentSectionData.instructions}
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 text-lg">
                  {currentSectionData.title}
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  {currentSectionData.description}
                </p>
              </div>
              
              <QuestionDisplay 
                question={currentSectionData.questions[currentQuestionIndex]} 
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={currentSectionData.questions.length}
              />
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0 && currentTest.sections.findIndex(s => s.id === currentSection) === 0}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={
                    currentQuestionIndex === currentSectionData.questions.length - 1 && 
                    currentTest.sections.findIndex(s => s.id === currentSection) === currentTest.sections.length - 1
                  }
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <TestNavigation 
              test={currentTest}
              currentSection={currentSection}
              currentQuestionIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              onJumpToSection={handleJumpToSection}
              onJumpToQuestion={handleJumpToQuestion}
            />
            
            <div className="mt-6">
              <button
                onClick={() => setShowConfirmation(true)}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center text-amber-500 mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Submit Test?</h3>
            </div>
            
            <p className="text-sm text-gray-600">
              You have answered {questionsAnswered} out of {totalQuestions} questions.
              {questionsAnswered < totalQuestions && ' Are you sure you want to submit without answering all questions?'}
            </p>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTest}
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;