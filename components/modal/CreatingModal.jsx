/* eslint-disable @next/next/no-html-link-for-pages */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ClockLoader } from 'react-spinners';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useContext } from 'react';
import { FormContext } from '@/context/formContext';

const CreatingModal = ({
  openMintModal,
  handleOnClose,
  isGenerating,
  generationComplete,
  base64Image,
  onNext,
}) => {
  const { handleMultistep } = useContext(FormContext);
  return (
    <>
      <Transition appear show={isGenerating} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-serif"
          onClose={handleOnClose}
        >
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
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-[450px] transform overflow-hidden rounded-2xl  glassmorphism feature-bal p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-center py-4 text-gray-100 gradient-text"
                  >
                    Generating your awesome Image...
                  </Dialog.Title>

                  <div className="mt-14 flex gap-2 w-full text-center items-center justify-center gradient-text">
                    <ClockLoader color="#f0f0f0" size="200px" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={generationComplete} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-serif"
          onClose={handleOnClose}
        >
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
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-[450px] transform overflow-hidden rounded-2xl  glassmorphism feature-bal p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-center py-4 text-gray-100 "
                  >
                    <span className="gradient-text">Generation Complete!</span>
                    🎉 🎉
                  </Dialog.Title>

                  <div className="mt-3 flex gap-2 w-full text-center items-center justify-center">
                    <img
                      src={`data:image/jpeg;base64,${base64Image}`}
                      alt=""
                      className="w-[300px] rounded-lg shadow-2xl"
                    />
                  </div>

                  <div className="text-center py-2 flex  justify-center">
                    <button
                      className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 text-md items-center flex"
                      onClick={handleOnClose}
                    >
                      Continue &nbsp;&nbsp;
                      <span className="animate-bounce">
                        <AiOutlineArrowRight />
                      </span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreatingModal;
