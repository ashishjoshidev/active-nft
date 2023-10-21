import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tokens, setTokens] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAccount();

  const empty = [];
//testing
  const fetchData = async () => {
    setIsLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_OPENSEA_KEY;
    const chainName = 'bscTestnet';
    const walletAddress = address;
    const url = `https://testnets-api.opensea.io/v2/chain/${chainName}/account/${walletAddress}/nfts?limit=50`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      //   setData(response.data);
      const data = response.data;

      //   console.log(data);

      //   Check if "nft_data" is null
      if (data && data.nfts && data.nfts.length > 0) {
        const updatedTokens = [];
        const updatedNfts = [];
        data.nfts.forEach((item) => {
          if (item === null) {
            // "nft_data" is null, add to tokens array
            updatedTokens.push(item);
          } else {
            // "nft_data" is not null, add to nfts array
            updatedNfts.push(item);
          }
        });
        // console.log(updatedNfts);
        setTokens(updatedTokens);
        setNfts(updatedNfts);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNfts(empty);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address]);

  return (
    <DataContext.Provider value={{ tokens, nfts, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};
