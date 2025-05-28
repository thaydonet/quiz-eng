import React from 'react';
import { Section } from '../../types';

interface ResultsChartProps {
  sectionScores: Record<string, { correct: number, total: number }>;
  testSections: Section[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ sectionScores, testSections }) => {
  return (
    <div className="space-y-4">
      {Object.entries(sectionScores).map(([sectionId, score]) => {
        const section = testSections.find(s => s.id === sectionId);
        if (!section) return null;
        
        const percentage = Math.round((score.correct / score.total) * 100);
        let barColor;
        
        if (percentage >= 80) barColor = 'bg-green-500';
        else if (percentage >= 60) barColor = 'bg-yellow-500';
        else barColor = 'bg-red-500';
        
        return (
          <div key={sectionId}>
            <div className="flex justify-between items-center text-xs font-medium text-gray-700">
              <span>{section.title}</span>
              <span>{percentage}%</span>
            </div>
            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${barColor} h-2 rounded-full`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsChart;