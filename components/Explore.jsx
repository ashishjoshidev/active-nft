import React, { useEffect, useState } from 'react';
import PromptCard from './cards/PromptCard';
import ExploreTab from './tab/ExploreTab';
import { formatAddress } from '@/utils/formatAddress';
import axios from 'axios';
import XPromptMarketplace from '@/abi/XPromptMarketplace.json';
import { ethers } from 'ethers';
import { config } from '@/abi';
import convertArrayToObject from '@/utils/convertToObject';
import { Chain } from '@wagmi/core'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import {  bscTestnet } from 'wagmi/chains';



const Explore = () => {
  const [listedNFTs, setListedNFTs] = useState([]);
  const chainName = 'bscTestnet';
  const API_URL = `https://testnets-api.opensea.io/v2/chain/${chainName}/contract/${config.xpromptV3}/nfts`;
  const apiKey = '474531d79fc84739a3b03950c9430bda';

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      // Parse the response to retrieve the ERC1155 tokens
      const tokens = response.data.nfts;

      // Filter out tokens with the identifiers "7", "8", and "9"
      const filteredTokens = tokens.filter(
        (token) =>
          !['7', '8', '9', '6', '10', '13', '14', '18'].includes(
            token.identifier
          )
      );

      // console.log(filteredTokens);
      setListedNFTs(filteredTokens);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-xl text-white mt-6 gradient-text">
        Explore AI Prompts
      </h1>
      <div className="ml-[60px]">
        <ExploreTab />
      </div>
      <div className="grid grid-cols-4 gap-6 mt-4 mx-[60px]">
        {listedNFTs.length > 0 && // Check if the array is not empty
          listedNFTs.map((nft, index) => (
            <PromptCard
              key={index}
              img={nft.image_url}
              tokenId={nft.identifier} // Access the tokenId property
              name={nft.name}
              chainAddress={nft.address}
            />
          ))}
      </div>
    </>
  );
};

export default React.memo(Explore);
