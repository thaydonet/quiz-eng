import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Test, Section, Question } from '../types';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeLimit, setTimeLimit] = useState(60);
  const [sections, setSections] = useState<Partial<Section>[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddSection = () => {
    setSections([...sections, {
      title: '',
      description: '',
      instructions: '',
      questions: []
    }]);
  };

  const handleAddQuestion = (sectionIndex: number) => {
    const newSections = [...sections];
    if (!newSections[sectionIndex].questions) {
      newSections[sectionIndex].questions = [];
    }
    newSections[sectionIndex].questions?.push({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 'A',
      explanation: '',
      type: 'reading'
    } as Question);
    setSections(newSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('tests')
        .insert([
          {
            title,
            description,
            difficulty,
            timeLimit,
            sections
          }
        ])
        .select();

      if (error) throw error;

      toast.success('Test created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setDifficulty('medium');
      setTimeLimit(60);
      setSections([]);
    } catch (error) {
      toast.error('Failed to create test');
      console.error('Error creating test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Test</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time Limit (minutes)</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sections</h2>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded-lg p-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Section Title</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[sectionIndex].title = e.target.value;
                    setSections(newSections);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Section Description</label>
                <textarea
                  value={section.description}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[sectionIndex].description = e.target.value;
                    setSections(newSections);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                <textarea
                  value={section.instructions}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[sectionIndex].instructions = e.target.value;
                    setSections(newSections);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Questions</h3>
                {section.questions?.map((question, questionIndex) => (
                  <div key={questionIndex} className="border rounded p-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Question Text</label>
                      <textarea
                        value={question.text}
                        onChange={(e) => {
                          const newSections = [...sections];
                          if (newSections[sectionIndex].questions) {
                            newSections[sectionIndex].questions![questionIndex].text = e.target.value;
                          }
                          setSections(newSections);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <label className="block text-sm font-medium text-gray-700">
                            Option {String.fromCharCode(65 + optionIndex)}
                          </label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newSections = [...sections];
                              if (newSections[sectionIndex].questions) {
                                newSections[sectionIndex].questions![questionIndex].options[optionIndex] = e.target.value;
                              }
                              setSections(newSections);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                      <select
                        value={question.correctAnswer}
                        onChange={(e) => {
                          const newSections = [...sections];
                          if (newSections[sectionIndex].questions) {
                            newSections[sectionIndex].questions![questionIndex].correctAnswer = e.target.value;
                          }
                          setSections(newSections);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Explanation</label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) => {
                          const newSections = [...sections];
                          if (newSections[sectionIndex].questions) {
                            newSections[sectionIndex].questions![questionIndex].explanation = e.target.value;
                          }
                          setSections(newSections);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddQuestion(sectionIndex)}
                  className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Question
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSection}
            className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Section
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Test'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;