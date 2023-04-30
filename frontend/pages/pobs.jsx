import { useState, useEffect } from 'react';
import { Network, Alchemy, Utils } from 'alchemy-sdk';
import { useAccount } from 'wagmi';
import { pobAddress } from '../constants/contracts';
import PobsComponent from "../components/PobsComponent";


export default function PobsPage() {
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI
  };
  const alchemy = new Alchemy(settings);
  
  const { address } = useAccount();
  
  const [pobs, setPobs] = useState();
    
  const fetchPobs = async () => {
    let pobs = [];
    const iterator = await alchemy.nft.getNftsForOwnerIterator(address);
    for await (const nft of iterator) {
      if (nft.contract.address === pobAddress.toLowerCase()) {
        pobs.push(nft);
      }
    }
    
    console.log(pobs);
    if (pobs) setPobs(pobs);
  } 
  
  useEffect(() => {    
    if (!pobs) fetchPobs();
  }, [address]);
  
  return (
    <PobsComponent pobs={pobs} />
  );
}
