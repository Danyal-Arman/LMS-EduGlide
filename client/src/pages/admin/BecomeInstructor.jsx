import React from 'react';

const BecomeInstructor = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center text-blue-900 dark:text-blue-400 mb-8">
        Become an Instructor and Inspire Learners Worldwide
      </h1>

      <section className="mb-8">
        <p className="text-lg text-center">
          Share your expertise and earn money teaching on EduFlow.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Flexible teaching</li>
          <li>Large audience reach</li>
          <li>Comprehensive instructor tools</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Create and publish high-quality, engaging course content</li>
          <li>Update course materials to keep content relevant</li>
          <li>Respond to student questions and feedback promptly</li>
          <li>Follow EduFlow's content guidelines and standards</li>
          <li>Promote a positive and inclusive learning environment</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Requirements</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Expertise in your field</li>
          <li>Passion for teaching</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-lg">
          <li className='dark:text-yellow-500  text-red-500 '>Visit your Profile Page !</li>
          <li  className='dark:text-yellow-500 text-red-500  '>Edit to become an Instructor from Student !</li>
          <li className='dark:text-yellow-500 text-red-500  '>Start publishing your courses !</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Instructor Support</h2>
        <p className="text-lg">Course builder, modern dashboard, and marketing help.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Monetization</h2>
        <p className="text-lg">Earn revenue with transparent payouts.</p>
      </section>

      <section className="mb-12">
        <blockquote className="italic border-l-4 border-blue-600 dark:border-blue-400 pl-4 text-gray-600 dark:text-gray-300 text-lg">
          “Thanks to EduFlow!”
        </blockquote>
      </section>
    </div>
  );
};

export default BecomeInstructor;
