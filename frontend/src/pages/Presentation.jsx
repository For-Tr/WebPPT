import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import StoreServices from '../services/DashboardServices';
import SlideEditor from '../components/SlideEditor';

const Presentation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isPresentMode, setIsPresentMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const data = await StoreServices.getPresentation(id);
        setPresentation(data);
        setNewTitle(data.title);
      } catch (error) {
        console.error('Error fetching presentation:', error);
      }
    };
    fetchPresentation();
  }, [id]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPresentMode) return;

      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };

    const handleWheel = (e) => {
      if (!isPresentMode) return;
      
      if (e.deltaY < 0) {
        handlePrevSlide();
      } else if (e.deltaY > 0) {
        handleNextSlide();
      }
    };

    const handleExitFullScreen = _ => {
      if (isPresentMode && !document.fullscreenElement) {
        exitPresentMode();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('fullscreenchange', handleExitFullScreen);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('fullscreenchange', handleExitFullScreen);
    };
  }, [currentSlideIndex, presentation, isPresentMode]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  const handleNextSlide = useCallback(() => {
    if (presentation && currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex, presentation]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const enterPresentMode = () => {
    setIsPresentMode(true);
    toggleFullscreen();
  };

  const exitPresentMode = () => {
    setIsPresentMode(false);
    setIsFullscreen(false);
  };

  const handleAddSlide = async () => {
    try {
      const newSlide = { 
        content: '',
        elements: []  // Initialize with empty elements array
      };
      const updatedPresentation = {
        ...presentation,
        slides: [...presentation.slides, newSlide]
      };
      await StoreServices.updatePresentation(id, updatedPresentation);
      setPresentation(updatedPresentation);
    } catch (error) {
      console.error('Error adding slide:', error);
    }
  };
  const handleDeleteSlide = async () => {
    if (presentation.slides.length === 1) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      const updatedSlides = presentation.slides.filter((_, index) => index !== currentSlideIndex);
      const updatedPresentation = { ...presentation, slides: updatedSlides };
      await StoreServices.updatePresentation(id, updatedPresentation);
      setPresentation(updatedPresentation);
      if (currentSlideIndex === updatedSlides.length) {
        setCurrentSlideIndex(currentSlideIndex - 1);
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
  };

  const handleDeletePresentation = async () => {
    try {
      await StoreServices.deletePresentation(id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting presentation:', error);
    }
  };

  const handleUpdateTitle = async () => {
    try {
      const updatedPresentation = { ...presentation, title: newTitle };
      await StoreServices.updatePresentation(id, updatedPresentation);
      setPresentation(updatedPresentation);
      setIsEditingTitle(false);
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };
  
  if (!presentation) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (isPresentMode) {
    return (
      <div className="fixed inset-0 bg-white">
        {/* <div className="absolute top-4 right-4 z-10">
          <button
            onClick={exitPresentMode}
            className="px-4 py-2 bg-black/10 hover:bg-black/20 text-white rounded-lg transition-colors"
          >
            Exit
          </button>
        </div> */}
        
        <div className="h-screen flex items-center justify-center">
          <div className="relative w-full max-w-[1200px] aspect-[16/9] mx-auto">
          <SlideEditor
                slide={presentation.slides[currentSlideIndex]}
                onUpdate={(updatedSlide) => {
                  const updatedSlides = [...presentation.slides];
                  updatedSlides[currentSlideIndex] = updatedSlide;
                  const updatedPresentation = {
                    ...presentation,
                    slides: updatedSlides
                  };
                  setPresentation(updatedPresentation);
                  StoreServices.updatePresentation(id, updatedPresentation);
              }}
              isPresentMode={isPresentMode}
              />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
          >
            ←
          </button>
          <span className="text-white">
            {currentSlideIndex + 1} / {presentation.slides.length}
          </span>
          <button
            onClick={handleNextSlide}
            disabled={currentSlideIndex === presentation.slides.length - 1}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            {isEditingTitle ? (
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleUpdateTitle}
                onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle()}
                autoFocus
                className="text-lg font-semibold px-2 border-b-2 border-blue-500 focus:outline-none"
              />
            ) : (
              <h1 
                onClick={() => setIsEditingTitle(true)}
                className="text-lg font-semibold cursor-pointer hover:text-blue-600"
              >
                {presentation.title}
              </h1>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleAddSlide}
              className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              New Slide
            </button>
            <button 
              onClick={enterPresentMode}
              className="px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              Present
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnails Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-4 space-y-3">
            {presentation.slides.map((slide, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`
                  relative aspect-[16/9] border-2 rounded-lg cursor-pointer
                  ${currentSlideIndex === index ? 'border-blue-500' : 'border-gray-200'}
                  hover:border-blue-300 transition-colors
                `}
              >
            <SlideEditor
              slide={presentation.slides[index]}
              hideSidebar={true}
              isPresenting={true}
              className="w-full h-full bg-white"
            />

                <div className="absolute bottom-1 right-1 text-xs text-gray-500">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 my-8">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-3 rounded-full ${
                currentSlideIndex === 0 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              ←
            </button>

            <div className="relative w-[800px] h-[600px] border border-gray-300 rounded-lg bg-white">
            
              <div className="absolute bottom-0 left-0 w-[50px] h-[50px] flex items-center justify-center text-gray-600">
                {currentSlideIndex + 1}
              </div>
            </div>

            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === presentation.slides.length - 1}
              className={`p-3 rounded-full ${
                currentSlideIndex === presentation.slides.length - 1
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              →
            </button>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 overflow-auto bg-gray-50 p-8">
            <div className="relative aspect-[16/9] bg-white rounded-lg shadow-lg">
              <SlideEditor
                slide={presentation.slides[currentSlideIndex]}
                onUpdate={(updatedSlide) => {
                  const updatedSlides = [...presentation.slides];
                  updatedSlides[currentSlideIndex] = updatedSlide;
                  const updatedPresentation = {
                    ...presentation,
                    slides: updatedSlides
                  };
                  setPresentation(updatedPresentation);
                  StoreServices.updatePresentation(id, updatedPresentation);
                }}
              />
             
            </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Transition appear show={showDeleteConfirm} as={Fragment}>
        <Dialog 
          as="div" 
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowDeleteConfirm(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as="div"  
              className="fixed inset-0 bg-black bg-opacity-25" 
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </Dialog.Title>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={handleDeletePresentation}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  >
                    No
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Presentation;