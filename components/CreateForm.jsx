/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage';
import { FormContext } from '@/context/formContext';
import { useAccount, useNetwork } from 'wagmi';
import { toast, ToastContainer } from 'react-toastify';
import { ethers } from 'ethers';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './modal/ConfirmationModal';
import XPromptV3 from '@/abi/XPromptV3.json';
import { config } from '@/abi';
import SuccessModal from './modal/SuccessModal';

const CreateForm = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { base64Image } = useContext(FormContext);
  const [openModal, setOpenModal] = useState(true);
  const [promptNftName, setPromptNftName] = useState('');
  const [promptNftDescription, setPromptNftDescription] = useState('');
  const [attr, setAttr] = useState(
    JSON.stringify([
      { trait_type: 'model', value: 'Stable Diffusion' },
      { trait_type: 'creator', value: '' },
      { trait_type: 'chain', value: '' },
      { trait_type: 'prompts', value: '' },
    ])
  );
  const [extUrl, setExtUrl] = useState('https://www.xprompt.xyz');
  const [prompt, setPrompt] = useState('');
  const [maxSupply, setMaxSupply] = useState();
  const [price, setNftPrice] = useState();
  const [receipt, setReceipt] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const apiKeys = process.env.NEXT_PUBLIC_NFTSTORAGE_TOKEN;

  const CreateNFT = async (e) => {
    e.preventDefault();

    let base64String = base64Image;

    let imageType = 'image/jpeg';

    // We convert the base64 string to a blob
    let blob = base64ToBlob(base64String, imageType);

    let parsedAttr = JSON.parse(attr);
    parsedAttr[3].value = prompt;

    parsedAttr[2].value = chain.name;
    setAttr(JSON.stringify(parsedAttr));

    parsedAttr[1].value = address;
    setAttr(JSON.stringify(parsedAttr));

    const mintNotification = toast.loading(
      'Please wait! Tokenizing your Prompt NFT'
    );

    try {
      const client = new NFTStorage({ token: apiKeys });
      const imageFile = new File([blob], 'image.jpg', {
        type: imageType,
      });

      console.log( "clinet =======>>>>>>>>>", client )
      
      const metadata = await client.store({
        name: promptNftName,
        description: promptNftDescription,
        image: imageFile,
        attributes: parsedAttr,
      } );
      
      console.log( "metadata =======>>>>>>>>>", metadata )

      // console.log(metadata.url);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tokenUri = 'ipfs://' + metadata + '/metadata.json';

      const royaltyFee = 10;

      // Convert royalty fee to wei
      const royaltyFeeWei = ethers.utils.parseUnits(royaltyFee.toString(), 2);

      const nftPromptFactory = new ethers.Contract(
        config.xpromptV3,
        XPromptV3,
        signer
      );

      const createPromptNft = await nftPromptFactory.createNFT(
        maxSupply,
        metadata.url,
        ethers.utils.parseEther(price)
      );

      const receipt = await createPromptNft.wait();
      console.log('createPromptNft: ', await createPromptNft.hash);
      console.log('receipt: ', receipt);

      // Show success message to the user
      toast.update(mintNotification, {
        render: 'Creation Completed Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 7000,
      });

      setTxHash(createPromptNft.hash);
      setOpenModal(true);
      setPromptNftName('');
      setPromptNftDescription('');
      setMaxSupply('');
      setNftPrice('');
    } catch (error) {
      console.log(error);
    }
  };

  function base64ToBlob(base64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  }

  return (
    <>
      <h1 className="text-white text-center font-bold text-2xl gradient-text">
        Tokenize Your Prompt
      </h1>
      <div className="flex gap-[100px]">
        <form className="ml-[150px] w-[400px] mt-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPromptNftName(e.target.value)}
            />
            <label
              for="floating"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prompt NFT Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPromptNftDescription(e.target.value)}
            />
            <label
              for="floating_repeat"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prompt NFT Description (Optional)
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPrompt(e.target.value)}
            />
            <label
              htmlFor="floating_repeat"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prompt
            </label>
          </div>

          <div class="text-gray-400 flex items-center">
            <label for="quantity" class="block mb-2">
              Maximum Supply:
            </label>
            &nbsp;&nbsp;
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="50000"
              class="px-4 bg-transparent py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setMaxSupply(e.target.value)}
            />
          </div>

          <div class="text-gray-400 mt-6 flex items-center">
            <label for="quantity" class="block mb-2 mr-12">
              NFT Price:
            </label>
            &nbsp;&nbsp;
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="50000"
              class="px-4 bg-transparent py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setNftPrice(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            onClick={CreateNFT}
          >
            Create
          </button>
        </form>

        <div className="mr-[100px] mt-10">
          <img
            src={`data:image/jpeg;base64,${base64Image}`}
            alt=""
            className="w-[430px] h-[400px] rounded-xl"
          />
        </div>
      </div>
      <ToastContainer />
      <SuccessModal
        openMintModal={openModal}
        handleOnClose={handleCloseModal}
        txHash={txHash}
      />
    </>
  );
};

export default CreateForm;
