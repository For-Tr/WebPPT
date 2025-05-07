import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {NewPresentationModal} from '../components/dashboard/NewPresentationModal';
import {PresentationCard} from '../components/dashboard/PresentationCard';
import StoreServices from '../services/DashboardServices';
import AdminServices from '../services/AdminServices';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const [presentations, setPresentations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
    try {
      setIsLoading(true);
      const presentations = await StoreServices.getPresentations();
      console.log(presentations)
      setPresentations(presentations);
    } catch (error) {
      setError('Failed to fetch presentations');
      console.error('Error fetching presentations:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      await AdminServices.logoutAdmin();
      Cookies.remove('adminInfo')
      navigate(`/`);
    } catch (error) {
      console.error('Error log out:', error);
    }
  }
  const handleCreatePresentation = async (title) => {
    try {
      const newPresentation = {
        id: Date.now().toString(),
        title,
        slides: [{
          id: '1',
          elements: [],
          background: { type: 'solid', color: '#ffffff' }
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await StoreServices.addPresentation(newPresentation);
      setIsModalOpen(false);
      navigate(`/presentation/${newPresentation.id}`);
    } catch (error) {
      console.error('Error creating presentation:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Presentations</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                     transition duration-150 ease-in-out"
        >
          Log Out
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                     transition duration-150 ease-in-out"
        >
          New Presentation
        </button>
      </div>

      {presentations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No presentations yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {presentations.map(presentation => (
            <PresentationCard
              key={presentation.id}
              presentation={presentation}
              onSelect={() => navigate(`/presentation/${presentation.id}`)}
              onDelete={async () => {
                try {
                  await StoreServices.deletePresentation(presentation.id);
                  fetchPresentations();
                } catch (error) {
                  console.error('Error deleting presentation:', error);
                }
              }}
            />
          ))}
        </div>
      )}

      <NewPresentationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePresentation}
      />
    </div>
  );
};

export default Dashboard;
