import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">EnglishPrep</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Helping Vietnamese high school students excel in their THPT English exams since 2025.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Practice Tests</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Grammar Guide</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Vocabulary Lists</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Exam Tips</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Our Story</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Teachers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Testimonials</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a href="mailto:info@englishprep.vn" className="text-gray-300 hover:text-white">
                  info@englishprep.vn
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <a href="tel:+84123456789" className="text-gray-300 hover:text-white">
                  +84 123 456 789
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-1" />
                <span className="text-gray-300">
                  123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EnglishPrep. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;