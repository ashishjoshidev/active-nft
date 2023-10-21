/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { FormContext } from '@/context/formContext';
import CreatingModal from './modal/CreatingModal';
import CreateForm from './CreateForm';
import Preset from './ai-params/Preset';
import ClipGuidancePreset from './ai-params/ClipGuidancePreset';
import CfgScale from './ai-params/CfgScale';
import Steps from './ai-params/Steps';
import Dimensions from './ai-params/Dimensions';

const CreateImageForm = ({ onNext }) => {
  const {
    selectedImg,
    base64Image,
    handleChange,
    handleClick,
    handleSubmit,
    openModal,
    isGenerating,
    generationComplete,
    setOpenModal,
    setIsGenerating,
    setGenerationComplete,
  } = useContext(FormContext);

  const closeModal = () => {
    setIsGenerating(false);
    setGenerationComplete(false);
  };

  return (
    <>
      {base64Image && base64Image.length > 0 ? (
        <CreateForm />
      ) : (
        <>
          <h1 className="text-white text-center text-xl">Select Model</h1>
          <p className="text-gray-400 text-center italic">
            Which style are you looking to create?
          </p>
          <div className="w-full flex justify-center text-center">
            <div className="flex items-center mt-4">
              <div
                className={`shadow-2xl  items-center cursor-pointer w-[140px] transition-all duration-400 ${
                  selectedImg === 'realism' &&
                  'border-white border-2 rounded-xl'
                }`}
                onClick={() => handleClick('realism')}
              >
                <img
                  src="realism.avif"
                  alt=""
                  className="w-[80px] ml-6 mb-4 h-[90px] rounded-lg"
                />
                <p className="text-white mt-3 text-center italic font-bold">
                  Epic Diffusion
                </p>
              </div>
              <div
                className={`shadow-2xl  items-center cursor-pointer w-[140px] ${
                  selectedImg === 'stable' && 'border-white border-2 rounded-xl'
                }`}
                onClick={() => handleClick('stable')}
              >
                <img
                  src="stable-diffusion.webp"
                  alt=""
                  className="w-[80px] ml-6 mb-4 h-[90px] rounded-lg"
                />
                <p className="text-white mt-3 text-center italic font-bold">
                  DALL-E
                </p>
              </div>
              <div
                className={`bg-black transition-all duration-400 ${
                  selectedImg === 'dalle' &&
                  'border-white border-2 rounded-xl p-2'
                }`}
                onClick={() => handleClick('dalle')}
              >
                <img src="dalle.jpg" alt="" className="w-[150px] h-[110px]" />
                <p className="text-white italic font-bold ">Stable Diffusion</p>
              </div>
              <div
                className={`bg-black transition-all duration-400 ${
                  selectedImg === 'waifu' && 'border-white border-2 rounded-xl'
                }`}
                onClick={() => handleClick('waifu')}
              >
                <img src="waifu.jpg" alt="" className="w-[150px] h-[100px]" />
                <p className="text-white mt-2 italic font-bold">
                  Waifu Diffusion
                </p>
              </div>
              <div
                className={`bg-black transition-all duration-400 ${
                  selectedImg === 'dreamshaper' &&
                  'border-white border-2 rounded-xl'
                }`}
                onClick={() => handleClick('dreamshaper')}
              >
                <img
                  src="dreamshaper.jpg"
                  alt=""
                  className="w-[150px] h-[100px]"
                />
                <p className="text-white mt-2 italic font-bold">Dreamshaper</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 mt-4">
            <div className="py-2 ml-[150px] text-gray-300">
              <p className="font-bold">Style_Preset:</p>
              <Preset />
            </div>

            <div className="py-2 text-gray-300">
              <p className="font-bold">Clip_Guidance_Preset:</p>
              <ClipGuidancePreset />
            </div>

            <div className="py-2 text-gray-300">
              <p className="font-bold">Cfg_Scale:</p>
              <CfgScale />
            </div>

            <div className="py-2 text-gray-300">
              <p className="font-bold">Steps:</p>
              <Steps />
            </div>

            <div className="py-2 text-gray-300">
              <p className="font-bold">Dimensions:</p>
              <Dimensions />
            </div>
          </div>

          <form className="mx-[150px] mt-2">
            <div className="mb-6">
              <label
                for="success"
                class="block mb-2 text-sm font-medium text-white dark:text-green-500"
              >
                <span className="italic text-lg">Prompt</span>
                <br />
                <span className="text-xl font-bold">Describe your Image</span>
              </label>

              <textarea
                type="text"
                id="success"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-500 text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
                placeholder="Creating awesomeness"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                onClick={handleSubmit}
              >
                Generate
              </button>
            </div>
          </form>
        </>
      )}
      <CreatingModal
        openMintModal={openModal}
        handleOnClose={closeModal}
        isGenerating={isGenerating}
        generationComplete={generationComplete}
        base64Image={base64Image}
        onNext={onNext}
      />
    </>
  );
};

export default CreateImageForm;
