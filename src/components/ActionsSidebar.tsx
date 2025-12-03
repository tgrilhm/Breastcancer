import React from 'react';
import { Upload, Calendar, Star, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageType } from '../App';

interface ActionsSidebarProps {
  onNavigate: (page: PageType) => void;
}

const specialists = [
  {
    id: 1,
    name: 'Dr. Emily Carter',
    specialty: 'Breast Imaging Specialist',
    rating: 4.9,
    reviews: 248,
    location: 'Medical Center Downtown',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Oncology Radiologist',
    rating: 4.8,
    reviews: 312,
    location: 'Central Hospital',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
    available: true,
  },
];

export function ActionsSidebar({ onNavigate }: ActionsSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => onNavigate('screening')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3 group"
        >
          <Upload size={20} className="group-hover:scale-110 transition-transform" />
          <span>Upload New Results</span>
        </button>
        
        <button 
          onClick={() => onNavigate('appointments')}
          className="w-full bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600 py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 group"
        >
          <Calendar size={20} className="group-hover:scale-110 transition-transform" />
          <span>Book Lab Appointment</span>
        </button>
      </div>
      
      {/* Available Specialists */}
      <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
        <h3 className="text-blue-900 mb-4">Available Specialists</h3>
        
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {specialists.map((doctor) => (
            <div 
              key={doctor.id}
              className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer border border-blue-100"
            >
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  {doctor.available && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-blue-900 truncate">{doctor.name}</h4>
                  <p className="text-sm text-blue-600 mb-2">{doctor.specialty}</p>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-amber-600">
                      <Star size={14} fill="currentColor" />
                      <span>{doctor.rating}</span>
                      <span className="text-blue-400">({doctor.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                    <MapPin size={12} />
                    <span className="truncate">{doctor.location}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-white hover:bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm transition-colors border border-blue-200">
                View Profile
              </button>
            </div>
          ))}
          
          {/* Partial card to show scrollability */}
          <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-4 opacity-50 border border-blue-100">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-blue-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-blue-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 text-blue-600 hover:text-blue-800 py-2 text-sm transition-colors">
          View All Specialists →
        </button>
      </div>
    </div>
  );
}
