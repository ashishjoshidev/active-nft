import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLock } from 'react-icons/ai';
import { useAccount } from 'wagmi';
import extractStrings from '@/utils/extractStrings';
import { config } from '@/abi';
import SecondaryPromptModal from './modal/SecondaryPromptModal';

const PromptDetails = ({ tokenId, prompt }) => {
  const { isConnected, address } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [result, setResult] = useState([]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_KEY;
  const chainName = 'bscTestnet';
  const walletAddress = address;
  // console.log(walletAddress);
  const API_URL = `https://testnets-api.opensea.io/v2/chain/${chainName}/account/${walletAddress}/nfts?limit=50`;

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      // Parse the response to retrieve the ERC1155 tokens
      const tokens = response.data.nfts;

      // console.log(tokens);
      const isTokenFound = tokens.some((token) => token.identifier === tokenId);

      // console.log(isTokenFound);

      if (isTokenFound) {
        setHasAccess(true);
        console.log('Has access');
      } else {
        setHasAccess(false);
        console.log('No access');
      }
    } catch (error) {
      console.error('Error fetching data:', error);

      console.error('Error fetching data:', error);
      setHasAccess(false); // Handle all errors as no access
      console.log('No access');
    }
  };

  useEffect(() => {
    fetchData();
  }, [address]);

  return (
    <>
      <div className="mx-20">
        {hasAccess ? (
          <div className="text-gray-300 w-full flex-col items-center justify-center text-center mt-[100px] mb-[200px] border border-gray-400 rounded-full py-20 px-16 shadow-2xl">
            <div className="text-white">{prompt && prompt}</div>

            <div className="mt-4">
              <button
                className="text-white bg-purple-500 text-md font-bold hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg  sm:w-auto  py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 px-8"
                onClick={handleOpenModal}
              >
                Generate Secondary Prompt
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-300 w-full flex-col items-center justify-center text-center mt-[100px] mb-[200px] glassmorphism4 py-20 ">
            <div>
              <p>
                <AiOutlineLock className="w-full text-6xl" />
                <span className="text-lg">
                  You currently do not have access to this prompt
                </span>
                <br />
                <br />
                <span className="">Buy NFT to get access</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <SecondaryPromptModal
        openMintModal={openModal}
        handleOnClose={handleCloseModal}
        prompt={prompt && prompt}
      />
    </>
  );
};

export default PromptDetails;
