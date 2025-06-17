import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Play, Users, Award } from "lucide-react";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchCourseHandler = async (e) => {
    e.preventDefault();
    if (query.length !== 0) {
      navigate(`/search-page?query=${query}`);
    }
  };

  const firstText = "Learn Today, ";
  const secondText = "Lead Tomorrow";
  const fullText = firstText + secondText;

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const beforeSpan = displayedText.slice(0, firstText.length);
  const afterSpan = displayedText.slice(firstText.length);

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 pt-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-5 animate-spin"
          style={{ animationDuration: '20s' }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                🎓 Transform Your Future with Learning
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">{beforeSpan}</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {afterSpan}
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                Discover, learn, and upskill with our wide range of courses. Join thousands of learners who are already transforming their careers.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={searchCourseHandler} className="relative max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                  type="text"
                  placeholder="Search courses..."
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={()=>navigate('/search-page?query')} className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Learning Today
              </button>
             
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl mb-2 mx-auto">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl mb-2 mx-auto">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl mb-2 mx-auto">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
