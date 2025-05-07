
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const ElementModal = ({ isOpen, type, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    width: 50,
    height: 50,
    x: 10,
    y: 10,
    position:{
      x: 10,
      y: 10,
    },
    size:{
      width:50,
      heigt:50,
    },
    text: '',
    fontSize: 1,
    color: '#000000',
    imageUrl: '',
    altText: '',
    videoUrl: '',
    autoplay: false,
    code: '',
    language: 'javascript'
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium mb-4">
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </Dialog.Title>

              <form onSubmit={(e) => {
                e.preventDefault();
                formData.size.heigt = formData.height
                formData.size.width = formData.width
                formData.position.x = formData.x
                formData.position.y = formData.y
                onSave(formData);
              }}>
                <div className="space-y-4">
                  {/* Common fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Width (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.width}
                      onChange={e => setFormData({...formData, width: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Height (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.height}
                      onChange={e => setFormData({...formData, height: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      x (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.x}
                      onChange={e => setFormData({...formData, x: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      y (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.y}
                      onChange={e => setFormData({...formData, y: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Type-specific fields */}
                  {/* Text type fields */}
                  {type === 'text' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Text
                        </label>
                        <textarea
                          value={formData.text}
                          onChange={e => setFormData({...formData, text: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Font Size (em)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.fontSize}
                          onChange={e => setFormData({...formData, fontSize: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Color
                        </label>
                        <input
                          type="color"
                          value={formData.color}
                          onChange={e => setFormData({...formData, color: e.target.value})}
                          className="mt-1 block w-full h-10 rounded-md border-gray-300"
                        />
                      </div>
                    </>
                  )}

                  {/* Image type fields */}
                  {type === 'image' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={formData.imageUrl}
                          onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={formData.altText}
                          onChange={e => setFormData({...formData, altText: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </>
                  )}

                  {/* Video type fields */}
                  {type === 'video' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          YouTube URL
                        </label>
                        <input
                          type="text"
                          value={formData.videoUrl}
                          onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.autoplay}
                          onChange={e => setFormData({...formData, autoplay: e.target.checked})}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Autoplay
                        </label>
                      </div>
                    </>
                  )}

                  {/* Code type fields */}
                  {type === 'code' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Code
                        </label>
                        <textarea
                          value={formData.code}
                          onChange={e => handleCodeChange(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
                          rows={6}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Font Size (em)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.fontSize}
                          onChange={e => setFormData({...formData, fontSize: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Language (Auto-detected)
                        </label>
                        <input
                          type="text"
                          value={formData.language}
                          readOnly
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                        />
                      </div>
                    </>
                  )}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ElementModal