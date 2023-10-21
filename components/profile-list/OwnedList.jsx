import { useEffect, useState } from 'react';
import axios from 'axios';
import OwnedCard from '../cards/OwnedCard';
import { useAccount } from 'wagmi';
import { config } from '@/abi';
import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';

const OwnedList = () => {
  const [result, setResult] = useState([]);
  const { isConnected, address } = useAccount();

  const { nfts } = useContext(DataContext);

  console.log(nfts);

  const targetContractAddress = config.xpromptV3;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4 mx-8">
      {nfts.map((item) => (
        <OwnedCard
          img={item.image_url || 'default.jpg'}
          name={item.name || 'Unknown'}
          // model={
          //   item.attributes.find((attr) => attr.trait_type === "model")
          //     ?.value || "Unknown"
          // }
          owner={address || 'Unknown'}
          nftAddress={item.contract || 'Unknown'}
          itemId={item.identifier || 'Unknown'}
          quantity={item.value || 'Unknown'}
        />
      ))}
    </div>
  );
};

export default OwnedList;
