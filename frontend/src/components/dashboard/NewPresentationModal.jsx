import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const NewPresentationModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    
    if (!trimmedTitle) {
      setError('Title is required');
      return;
    }

    onCreate(trimmedTitle);
    setTitle('');
    setError('');
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-4">
            Create New Presentation
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter presentation title"
                autoFocus
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
                           rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                           rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-blue-500"
              >
                Create
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export { NewPresentationModal };