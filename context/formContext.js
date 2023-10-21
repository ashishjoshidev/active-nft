import React, { createContext, useState } from 'react';
import axios from 'axios';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [selectedImg, setSelectedImg] = useState('dalle');
  const [prompt, setPrompt] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [formSwitcher, setFormSwitcher] = useState(true);

  const title = {
    0: 'Select Model',
    1: 'Tokenize Prompt',
  };

  const [page, setPage] = useState(0);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const token = process.env.NEXT_PUBLIC_SD_API_KEY;
    const modelId = 'stable-diffusion-xl-beta-v2-2-2'; // chosen model id
    const apiHost = 'https://api.stability.ai';

    try
    {
      
      console.log( "sd api key ============>>>>>>>>>>>>", token )
      
      const response = await axios({
        method: 'POST',
        url: `${apiHost}/v1/generation/${modelId}/text-to-image`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 512,
          samples: 1,
          steps: 150,
          style_preset: 'cinematic',
        }),
      });

      // use the response here
      console.log(response.data);
      if (
        response.data &&
        response.data.artifacts &&
        response.data.artifacts[0].base64
      ) {
        setBase64Image(response.data.artifacts[0].base64);
      }
      setIsGenerating(false);
      setGenerationComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    if (isGenerating) {
      setOpenModal(true);
    }
  };

  const handleClick = (name) => {
    setSelectedImg(name);
  };

  const handleMultistep = (e) => {
    e.preventDefault();
    setFormSwitcher(true);
  };

  return (
    <FormContext.Provider
      value={{
        formSwitcher,
        handleMultistep,
        selectedImg,
        setSelectedImg,
        prompt,
        setPrompt,
        openModal,
        setOpenModal,
        isGenerating,
        setIsGenerating,
        generationComplete,
        setGenerationComplete,
        base64Image,
        setBase64Image,
        handleChange,
        handleSubmit,
        handleOpenModal,
        handleClick,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
