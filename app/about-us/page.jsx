"use client";

import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">About QuickCart</h1>
      
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            QuickCart was founded in 2023 with a simple mission: to make online shopping faster, easier, and more enjoyable.
          </p>
          <p className="text-gray-700">
            What started as a small team of e-commerce enthusiasts has grown into a platform serving thousands of customers across the country.
          </p>
        </div>
        <div className="flex justify-center">
          <Image 
            src={assets.boy_with_laptop_image} 
            alt="Our team" 
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="flex justify-center order-2 md:order-1">
          <Image 
            src={assets.girl_with_earphone_image} 
            alt="Our values" 
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-2xl font-semibold">Our Values</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Customer-first approach in everything we do</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Fast and reliable delivery</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Quality products from trusted sellers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">Innovation to improve your shopping experience</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We're a passionate team of e-commerce experts, designers, and developers dedicated to creating the best shopping experience for you.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
