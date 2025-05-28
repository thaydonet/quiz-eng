import React, { createContext, useState, useContext, useEffect } from 'react';
import { Test, TestResult, UserAnswer } from '../types';
import { fetchTestById } from '../services/testService';
import toast from 'react-hot-toast';

interface TestContextType {
  currentTest: Test | null;
  setCurrentTest: (test: Test | null) => void;
  userAnswers: UserAnswer[];
  setUserAnswers: (answers: UserAnswer[]) => void;
  addUserAnswer: (questionId: string, answer: string) => void;
  remainingTime: number;
  setRemainingTime: (time: number) => void;
  isTestActive: boolean;
  setIsTestActive: (active: boolean) => void;
  startTest: (testId: string) => Promise<void>;
  finishTest: () => TestResult | null;
  testResults: TestResult[];
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>(() => {
    const saved = localStorage.getItem('testResults');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    localStorage.setItem('testResults', JSON.stringify(testResults));
  }, [testResults]);

  const addUserAnswer = (questionId: string, answer: string) => {
    setUserAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionId, answer };
        return newAnswers;
      } else {
        return [...prev, { questionId, answer }];
      }
    });
  };

  const startTest = async (testId: string) => {
    try {
      const test = await fetchTestById(testId);
      if (test) {
        setCurrentTest(test);
        setUserAnswers([]);
        setRemainingTime(test.timeLimit * 60); // Convert minutes to seconds
        setIsTestActive(true);
        setCurrentSection(test.sections[0].id);
      }
    } catch (error) {
      toast.error('Failed to load test. Please try again.');
      console.error('Error starting test:', error);
    }
  };

  const finishTest = (): TestResult | null => {
    if (!currentTest) return null;

    let correctAnswers = 0;
    let totalQuestions = 0;
    const sectionScores: Record<string, { correct: number, total: number }> = {};

    currentTest.sections.forEach(section => {
      let sectionCorrect = 0;
      section.questions.forEach(question => {
        totalQuestions++;
        const userAnswer = userAnswers.find(a => a.questionId === question.id);
        if (userAnswer && userAnswer.answer === question.correctAnswer) {
          correctAnswers++;
          sectionCorrect++;
        }
      });
      sectionScores[section.id] = {
        correct: sectionCorrect,
        total: section.questions.length
      };
    });

    const score = Math.round((correctAnswers / totalQuestions) * 10 * 100) / 100;
    const timestamp = new Date().toISOString();
    
    const result: TestResult = {
      id: `result-${timestamp}`,
      testId: currentTest.id,
      testName: currentTest.title,
      score,
      maxScore: 10,
      totalQuestions,
      correctAnswers,
      completedAt: timestamp,
      sectionScores,
      userAnswers,
    };

    setTestResults(prev => [...prev, result]);
    setIsTestActive(false);
    
    return result;
  };

  return (
    <TestContext.Provider
      value={{
        currentTest,
        setCurrentTest,
        userAnswers,
        setUserAnswers,
        addUserAnswer,
        remainingTime,
        setRemainingTime,
        isTestActive,
        setIsTestActive,
        startTest,
        finishTest,
        testResults,
        currentSection,
        setCurrentSection,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};