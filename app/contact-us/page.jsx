"use client";

import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
              <p className="text-xs text-gray-500 mt-1">We'll never share your details</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Image 
                src={assets.my_location_image} 
                alt="Address" 
                width={24}
                height={24}
                priority
              />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">123 E-Commerce Street, Bangalore, India 560001</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Image 
                src={assets.user_icon} 
                alt="Email" 
                width={24}
                height={24}
                priority
              />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">support@quickcart.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Image 
                src={assets.cart_icon} 
                alt="Phone" 
                width={24}
                height={24}
                priority
              />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="font-medium mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <Image 
                src={assets.facebook_icon} 
                alt="Facebook" 
                width={24}
                height={24}
                className="cursor-pointer hover:opacity-80"
                priority
              />
              <Image 
                src={assets.twitter_icon} 
                alt="Twitter" 
                width={24}
                height={24}
                className="cursor-pointer hover:opacity-80"
                priority
              />
              <Image 
                src={assets.instagram_icon} 
                alt="Instagram" 
                width={24}
                height={24}
                className="cursor-pointer hover:opacity-80"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
        <div className="h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13758.799673453579!2d77.02852675545346!3d28.59658469896837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1aafdb891567%3A0x10d270731c930a87!2sGuru%20Gobind%20Singh%20Indraprastha%20University!5e1!3m2!1sen!2sin!4v1751971318527!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
