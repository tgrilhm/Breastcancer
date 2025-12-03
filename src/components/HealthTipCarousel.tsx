import React from 'react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const healthTips = [
  {
    title: "Self-Examination",
    text: "Did you know? Regular self-exams can help detect changes early. Swipe to learn how.",
  },
  {
    title: "Annual Screening",
    text: "Women over 40 should have annual mammograms. Early detection saves lives.",
  },
  {
    title: "Healthy Lifestyle",
    text: "Maintaining a healthy weight and regular exercise can reduce breast cancer risk by 20%.",
  },
  {
    title: "Know Your History",
    text: "Family history matters. Share your family's health history with your doctor.",
  },
  {
    title: "Stay Informed",
    text: "Stay up to date with the latest screening guidelines and recommendations.",
  },
];

export function HealthTipCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? healthTips.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === healthTips.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="text-pink-300" size={24} fill="currentColor" />
            <h2 className="text-white">Daily Health Tip</h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
              aria-label="Previous tip"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
              aria-label="Next tip"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        
        <div className="min-h-[80px] flex items-center">
          <p className="text-white text-lg">
            <span className="opacity-90">{healthTips[activeIndex].text}</span>
          </p>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {healthTips.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all ${
                index === activeIndex
                  ? 'w-8 h-2 bg-white rounded-full'
                  : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
              }`}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
