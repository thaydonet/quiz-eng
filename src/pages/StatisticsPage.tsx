import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { useTest } from '../contexts/TestContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsPage = () => {
  const { testResults } = useTest();

  // Prepare data for score progression chart
  const scoreProgressionData = {
    labels: testResults.map((_, index) => `Test ${index + 1}`),
    datasets: [
      {
        label: 'Score',
        data: testResults.map(result => result.score),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Calculate section performance data
  const sectionPerformance: { [key: string]: { total: number; correct: number } } = {};
  testResults.forEach(result => {
    Object.entries(result.sectionScores).forEach(([section, scores]) => {
      if (!sectionPerformance[section]) {
        sectionPerformance[section] = { total: 0, correct: 0 };
      }
      sectionPerformance[section].total += scores.total;
      sectionPerformance[section].correct += scores.correct;
    });
  });

  const sectionPerformanceData = {
    labels: Object.keys(sectionPerformance).map(section => 
      section.charAt(0).toUpperCase() + section.slice(1)
    ),
    datasets: [
      {
        label: 'Accuracy (%)',
        data: Object.values(sectionPerformance).map(
          scores => (scores.correct / scores.total) * 100
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  // Calculate overall statistics
  const totalTests = testResults.length;
  const averageScore = totalTests > 0
    ? testResults.reduce((sum, result) => sum + result.score, 0) / totalTests
    : 0;
  const bestScore = totalTests > 0
    ? Math.max(...testResults.map(result => result.score))
    : 0;
  const totalQuestions = testResults.reduce((sum, result) => sum + result.totalQuestions, 0);
  const totalCorrect = testResults.reduce((sum, result) => sum + result.correctAnswers, 0);
  const overallAccuracy = totalQuestions > 0
    ? (totalCorrect / totalQuestions) * 100
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Performance Statistics</h1>

      {totalTests === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No test data available yet. Complete some tests to see your statistics.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Tests Completed</h3>
              <p className="mt-2 text-3xl font-bold text-blue-800">{totalTests}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Average Score</h3>
              <p className="mt-2 text-3xl font-bold text-blue-800">
                {averageScore.toFixed(1)}/10
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Best Score</h3>
              <p className="mt-2 text-3xl font-bold text-blue-800">
                {bestScore.toFixed(1)}/10
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Overall Accuracy</h3>
              <p className="mt-2 text-3xl font-bold text-blue-800">
                {overallAccuracy.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Score Progression</h3>
              <Line data={scoreProgressionData} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Section Performance</h3>
              <Bar
                data={sectionPerformanceData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Test History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Correct/Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testResults.slice(-5).map((result) => (
                      <tr key={result.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.testName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.score.toFixed(1)}/10
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.correctAnswers}/{result.totalQuestions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticsPage;