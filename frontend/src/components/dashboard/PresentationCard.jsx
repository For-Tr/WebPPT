import React, { useState } from 'react';
import { format } from 'date-fns';

const PresentationCard = ({ presentation, onSelect, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { title, createdAt, slides } = presentation;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this presentation?')) {
      onDelete();
    }
  };

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
                 hover:shadow-lg transition duration-150 ease-in-out relative"
    >
      <div className="aspect-w-16 aspect-h-9">
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          {slides[0]?.thumbnail ? (
            <img 
              src={slides[0].thumbnail} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <svg 
                className="w-12 h-12"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span className="mt-2">No Preview</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 truncate flex-1">{title}</h3>
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-1">
                  <button
                    onClick={handleDelete}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
          <span>{slides.length} slide{slides.length !== 1 ? 's' : ''}</span>
          <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
        </div>
      </div>
    </div>
  );
};

export { PresentationCard };

