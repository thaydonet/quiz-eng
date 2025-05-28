import React, { useEffect, useRef } from 'react';
import { useTest } from '../../contexts/TestContext';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const TestTimer: React.FC = () => {
  const { 
    remainingTime, 
    setRemainingTime, 
    isTestActive, 
    currentTest,
    finishTest 
  } = useTest();
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTestActive && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Auto submit when time runs out
            const result = finishTest();
            if (result && currentTest) {
              navigate(`/results/${currentTest.id}`);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestActive, remainingTime, setRemainingTime, finishTest, currentTest, navigate]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours > 0 ? String(hours).padStart(2, '0') : null,
      String(minutes).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  // Calculate progress percentage
  const totalSeconds = currentTest ? currentTest.timeLimit * 60 : 0;
  const elapsedSeconds = totalSeconds - remainingTime;
  const progressPercentage = (elapsedSeconds / totalSeconds) * 100;
  
  // Determine color based on remaining time
  let progressColor = 'bg-blue-600';
  if (remainingTime < totalSeconds * 0.25) {
    progressColor = 'bg-red-600';
  } else if (remainingTime < totalSeconds * 0.5) {
    progressColor = 'bg-yellow-500';
  }

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-800 mr-2" />
          <h3 className="font-medium text-blue-800">Time Remaining</h3>
        </div>
        <span className="text-lg font-bold text-blue-800">{formatTime(remainingTime)}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${progressColor} h-2.5 rounded-full transition-all duration-1000 ease-linear`}
          style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TestTimer;