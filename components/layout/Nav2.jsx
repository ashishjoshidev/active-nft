import React, { useState } from 'react';
import { SiBlockchaindotcom } from 'react-icons/si';
import Link from 'next/link';
import ChooseCreate from '../modal/ChooseCreate';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEnsName, useEnsAvatar } from 'wagmi';
import { useAccount } from 'wagmi';

const Nav2 = () => {
  const [sticky, setSticky] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { address } = useAccount();
  const ensName = useEnsName({
    address: address,
    chainId: 5,
    staleTime: 'infinity',
  });

  const ensAvatar = useEnsAvatar({
    address: address,
    chainId: 5,
    staleTime: 'infinity',
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <nav
      className={
        sticky
          ? 'stick transition-all backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 bg-transparent z-50'
          : ''
      }
    >
      <section className="container max-w-[78rem] mx-auto px-6 sticky">
        <div className="relative flex items-center justify-between h-24">
          <div className="flex items-center justify-between w-full">
            <Link
              className="flex items-center justify-center max-w-[121px] sm:max-w-[161px] px-1 sm:px-[5.33px] transition-all"
              href="/"
            >
              {/* <div className="text-white text-[20px]">
                <SiBlockchaindotcom />
              </div>
              &nbsp; */}
              <p className="text-white text-[25px] font-bold">xPromptNFT</p>
            </Link>
            <div className="hidden sm:flex items-center w-full ml-11 transition-all">
              <div className="flex sm:space-x-4 md:space-x-10 justify-center text-white transition-all">
                <Link href="/">
                  <button type="button" className="text-base font-normal">
                    Home
                  </button>
                </Link>
                <Link href="/explore">
                  <button type="button" className="text-base font-normal">
                    Explore
                  </button>
                </Link>
                  <Link href="/create">
                  <button type="button" className="text-base font-normal">
                    Create
                  </button>
                </Link>
                {/* <button
                  type="button"
                  className="text-base font-normal"
                  onClick={handleOpenModal}
                >
                  Create
                </button> */}
              </div>
            </div>
            <div className="absolute right-12">
              <ConnectButton showBalance={false} />
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link href="/profile">
              <span className="text-end ml-[80px] p-2 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
            </Link>
          </div>

          {/* <div className="absolute inset-y-0 right-0 flex items-center transition-all sm:hidden">
            <button
              className="min-[412px]:text-white min-[412px]:bg-[#101010]/[.3]  min-[412px]:backdrop-blur-lg text-white rounded-sm w-6 h-6 inline-flex items-center justify-center rounded-mdx hover:bg-none focus:outline-none focus:ring-none focus:ring-none transition-all"
              id="headlessui-disclosure-button-:R15id6:"
              type="button"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span className="sr-only">Open main menu</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                ></rect>
                <rect
                  x="2"
                  y="11"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                ></rect>
                <rect
                  x="2"
                  y="18"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                ></rect>
              </svg>
            </button>
          </div> */}
        </div>
      </section>
      <ChooseCreate
        openMintModal={openModal}
        handleOnClose={() => setOpenModal(false)}
      />
    </nav>
  );
};

export default Nav2;
