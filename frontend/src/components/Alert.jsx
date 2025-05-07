import { Dialog } from '@headlessui/react';

const AlertDialog = (props) => {
  const { open, message, onClose } = props;

  return (
    <Dialog as="div" open={open} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* 使用h3替代Dialog.Title */}
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Alert
          </h3>
          
          <div className="mt-2 text-sm text-gray-500">
            {message}
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AlertDialog;