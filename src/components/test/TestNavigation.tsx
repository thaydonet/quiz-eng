import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Test, UserAnswer } from '../../types';

interface TestNavigationProps {
  test: Test;
  currentSection: string;
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  onJumpToSection: (sectionId: string) => void;
  onJumpToQuestion: (sectionId: string, questionIndex: number) => void;
}

const TestNavigation: React.FC<TestNavigationProps> = ({
  test,
  currentSection,
  currentQuestionIndex,
  userAnswers,
  onJumpToSection,
  onJumpToQuestion
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Initially expand only the current section
    const expanded: Record<string, boolean> = {};
    test.sections.forEach(section => {
      expanded[section.id] = section.id === currentSection;
    });
    return expanded;
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const isQuestionAnswered = (questionId: string) => {
    return userAnswers.some(answer => answer.questionId === questionId);
  };

  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-4">Test Navigation</h3>
      
      <div className="space-y-2">
        {test.sections.map((section) => {
          const isSectionExpanded = expandedSections[section.id];
          const isCurrentSection = section.id === currentSection;
          const answeredQuestionsInSection = section.questions.filter(q => 
            isQuestionAnswered(q.id)
          ).length;
          
          return (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                onClick={() => toggleSection(section.id)}
                className={`
                  p-3 flex justify-between items-center cursor-pointer
                  ${isCurrentSection ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}
                `}
              >
                <div>
                  <h4 className={`font-medium ${isCurrentSection ? 'text-blue-800' : 'text-gray-800'}`}>
                    {section.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {answeredQuestionsInSection}/{section.questions.length} answered
                  </p>
                </div>
                <div>
                  {isSectionExpanded ? 
                    <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </div>
              </div>
              
              {isSectionExpanded && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-5 gap-2">
                    {section.questions.map((question, index) => {
                      const isAnswered = isQuestionAnswered(question.id);
                      const isActive = isCurrentSection && currentQuestionIndex === index;
                      
                      return (
                        <button
                          key={question.id}
                          onClick={() => onJumpToQuestion(section.id, index)}
                          className={`
                            w-full h-8 flex items-center justify-center text-sm rounded
                            ${isActive 
                              ? 'bg-blue-800 text-white' 
                              : isAnswered 
                                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300'}
                          `}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestNavigation;