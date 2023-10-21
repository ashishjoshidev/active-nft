import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { config } from '@/abi';
import Nav2 from '@/components/layout/Nav2';
import NftPageDetails from '@/components/NftPageDetails';

const NftDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [result, setResult] = useState(null);
  const chainName = 'bscTestnet';
  const API_URL = `https://testnets-api.opensea.io/v2/chain/${chainName}/contract/${config.xpromptV3}/nfts/${id}`;

  const fetchData = async (nftId) => {
    try {
      const response = await axios.get(nftId);

      const tokens = response.data.nft;
      setResult(tokens);
      console.log('first data', tokens);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(API_URL);
    }
  }, [id]);

  return (
    <>
      <div className="bg-[url('/bg-stars.png')] bg-repeat-x bg-center relative">
        <Nav2 />

        {result && result && (
          <NftPageDetails
            image={result.image_url}
            name={result.name}
            description={result.description}
            attributes={result.traits}
            tokenId={result.identifier}
            owner={result.owners[0].address}
            metadata={result.metadata_url}
          />
        )}
      </div>
    </>
  );
};

export default NftDetails;
