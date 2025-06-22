'use server';
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Get Me a Chai</h1>
        <p className="text-lg mb-10 text-center text-gray-300">
          Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans.
          It's a space where your fans can directly contribute to your creative endeavors by buying you a chai.
          Unlock the potential of your fanbase and bring your projects to life.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
            <div className="mb-6">
              <p className="text-yellow-400 font-medium">Fans Want to Collaborate</p>
              <p className="text-gray-400">Your fans are enthusiastic about collaborating with you on your projects.</p>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Benefits for Creators</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Direct financial support from your fanbase</li>
              <li>Engage with your fans on a more personal level</li>
              <li>Access to a platform tailored for creative projects</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">Benefits for Fans</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Directly contribute to the success of your favorite creators</li>
              <li>Exclusive rewards and perks for supporting creators</li>
              <li>Be part of the creative process and connect with creators</li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Support Through Chai</h2>
              <p className="text-gray-400">Receive support from your fans in the form of chai purchases, directly contributing to your project funding.</p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">Benefits of Collaboration</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Unlock new opportunities through collaboration with fellow creators</li>
              <li>Expand your network and reach a wider audience</li>
              <li>Combine skills and resources to create innovative projects</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">Community Engagement</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Connect with a supportive community of like-minded individuals</li>
              <li>Receive valuable feedback and encouragement from peers</li>
              <li>Participate in discussions and events centered around your interests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

export async function generateMetadata() {
  return {
    title: 'About - Get Me a Chai',
    description: 'Learn more about Get Me a Chai',
  };
}