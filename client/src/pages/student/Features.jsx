import React from 'react';
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Smartphone,
  HeadphonesIcon,
  CheckCircle,
  Star
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with real-world experience',
      benefits: ['Industry-relevant curriculum', 'Practical projects', 'Career guidance'],
      color: 'blue'
    },
    {
      icon: Star,
      title: 'AI-Powered Assistance (Coming Soon)',
      description: 'Soon, you’ll be able to convert lectures to text and get smart, personalized help with your studies.',
      benefits: [
        'Lecture-to-text conversion',
        'Custom learning support',
        'AI-driven Q&A for instant clarity'
      ],
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Instructor Dashboard',
      description: 'A dedicated dashboard to help instructors monitor student progress, course engagement, and earnings in real-time.',
      benefits: [
        'Track student learning progress',
        'View course sales & revenue stats',
        'Insights into student engagement'
      ],
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Learn at Your Pace',
      description: 'Flexible scheduling that fits your busy lifestyle',
      benefits: ['24/7 access', 'Offline downloads', 'Progress tracking'],
      color: 'orange'
    },
    {
      icon: Smartphone,
      title: 'Mobile Learning',
      description: 'Access your courses anywhere with our mobile-optimized platform',
      benefits: ['iOS & Android apps', 'Offline viewing', 'Sync across devices'],
      color: 'pink'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support (coming soon)',
      description: 'Get help whenever you need it with our dedicated support team',
      benefits: ['Live chat support', 'Email assistance', 'Community forums'],
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const base = {
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      green: 'text-green-500',
      orange: 'text-orange-500',
      pink: 'text-pink-500',
      indigo: 'text-indigo-500',
    };
    return base[color] || 'text-gray-500';
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white  rounded-full text-sm font-medium mb-4">
            ✨ Why Choose EduFlow
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our comprehensive learning platform is designed to help you achieve your goals with the best tools and support
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="border p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className={`mb-4 ${getColorClasses(feature.color)}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
