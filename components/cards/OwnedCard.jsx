/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { formatAddress } from '@/utils/formatAddress';
import ListNftModal from '../modal/ListNftModal';
import { useEnsName, useEnsAvatar } from 'wagmi';

const OwnedCard = ({
  img,
  name,
  model,
  owner,
  nftAddress,
  tokenId,
  quantity,
}) => {
  const [openModal, setOpenModal] = useState(false);

  // const { address } = useAccount();
  const ensNameData = useEnsName({
    address: owner,
    chainId: 5,
  });

  const ensName = ensNameData.data;

  const ensAvatarData = useEnsAvatar({
    address: owner,
    chainId: 5,
  });

  const ensAvatar = ensAvatarData.data;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="border-gradient relative mb-10 flex justify-center items-center rounded-lg">
      <div className="w-full h-full cursor-pointer overflow-hidden rounded-2xl p-1 flex flex-col items-center bg-black">
        <img
          src={img}
          alt=""
          className="w-[250px] h-[300px] object-cover rounded-[30px] transition-all duration-500 hover:opacity-90 pt-2"
        />

        <div className="flex items-center justify-between gap-4">
          <div>
            <div>
              <img
                src="sol.png"
                alt=""
                className="w-[27px] absolute top-4 right-7 bg-purple-800 rounded-2xl"
              />
            </div>

            <span className="text-gray-300 absolute top-4 left-4 bg-purple-700 p-1 px-4 text-sm rounded-full font-bold">
              Stable Diffusion
            </span>

            <h3 className="mt-1 text-md text-center font-bold text-gray-300 w-full pt-2">
              {name}
            </h3>
            <div className="flex items-center justify-between mt-1 text-gray-300">
              <div className="flex items-center  w-full mx-[20px]">
                <img
                  src={
                    ensAvatar
                      ? ensAvatar
                      : 'https://static.vecteezy.com/system/resources/thumbnails/004/257/968/small/abstract-purple-fluid-wave-background-free-vector.jpg'
                  }
                  alt=""
                  className="w-[30px] rounded-[30px]"
                  style={{width:"30px",height:"30px"}}
                />
                &nbsp;
                <div className="flex flex-col ">{ensName && ensName}</div>
              </div>
            </div>

            <div
              className="flex justify-center text-gray-300 py-2"
              onClick={handleOpenModal}
            >

               <button
                           
                            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 mt-6"
                          
                          >
                            List NFT
                          </button>
              
            </div>
          </div>
        </div>
      </div>
      <ListNftModal
        openMintModal={openModal}
        handleOnClose={handleCloseModal}
        nftName={name}
        nftAddress={nftAddress}
        tokenId={tokenId}
        avalaibleQuantity={quantity}
      />
    </div>
  );
};

export default OwnedCard;
