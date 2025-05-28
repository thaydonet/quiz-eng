import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, BarChart, Sparkles, Target } from 'lucide-react';
import { testConnection } from '../lib/supabaseTest';

const HomePage = () => {
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Ace Your THPT English Exam
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-3xl">
                Comprehensive practice tests that simulate the real THPT English exam. Start preparing today and boost your confidence for the national high school examination.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/tests"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-800 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  Start Practicing
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent border-white rounded-md text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg" 
                alt="Students studying"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Complete THPT English Exam Preparation
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform covers all sections of the official THPT English exam format, providing comprehensive practice materials to help you excel.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">All Exam Sections</h3>
              <p className="mt-2 text-gray-600">
                Practice with all six sections of the THPT English exam: Reading Comprehension, Grammar and Vocabulary, Pronunciation, Sentence Transformation, Cloze Test, and Error Identification.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Timed Practice</h3>
              <p className="mt-2 text-gray-600">
                Practice under real exam conditions with our timed tests. Improve your speed and accuracy to maximize your score on test day.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Detailed Explanations</h3>
              <p className="mt-2 text-gray-600">
                Learn from your mistakes with detailed explanations for every question. Understand the reasoning behind each correct answer.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Targeted Practice</h3>
              <p className="mt-2 text-gray-600">
                Focus on specific sections or question types that challenge you the most. Practice efficiently by targeting your weak areas.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Performance Tracking</h3>
              <p className="mt-2 text-gray-600">
                Monitor your progress over time with detailed statistics and performance analytics. Identify trends and track your improvement.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Realistic Simulation</h3>
              <p className="mt-2 text-gray-600">
                Experience the format and difficulty level of the actual THPT English exam. Familiarize yourself with the exam structure to reduce test anxiety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Ready to start practicing?</span>
            <span className="block text-blue-300">Begin your THPT English exam preparation today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/tests"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-blue-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful students who have improved their THPT English exam scores with our practice tests.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                  TL
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Tran Linh</h4>
                  <p className="text-gray-600">Ha Noi</p>
                </div>
              </div>
              <p className="text-gray-700">
                "This platform helped me improve my score from 7.5 to 9.0 on the THPT English exam. The practice tests are very similar to the real exam, and the explanations helped me understand my mistakes."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                  NQ
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Nguyen Quang</h4>
                  <p className="text-gray-600">Ho Chi Minh City</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was struggling with the reading and grammar sections, but after using this platform for two months, I gained confidence and improved significantly. The timed practice really helped with my time management during the exam."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                  PT
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Pham Thao</h4>
                  <p className="text-gray-600">Da Nang</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The detailed explanations for each question helped me understand my mistakes and learn from them. I appreciate how the platform covers all sections of the THPT English exam. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;