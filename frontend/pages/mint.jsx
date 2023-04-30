import { useState, useEffect } from 'react';
import { Network, Alchemy, Utils } from 'alchemy-sdk';
import { useAccount, useSigner } from 'wagmi';
import { pobAddress, pobAbi } from '../constants/contracts';
import { ethers } from 'ethers';
import { Center, Flex } from '@chakra-ui/react';
import MintComponent from "../components/MintComponent";
import ResultComponent from '../components/ResultComponent';

export default function MintPage() {
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI
  };
  const alchemy = new Alchemy(settings);
  
  const { address } = useAccount();
  const { data: signer } = useSigner();
  
  const [pobContract, setPobContract] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const initPobContract = () => {
    if (!signer) return;
    setPobContract(new ethers.Contract(pobAddress, pobAbi, signer));
  }
  
  const mint = async (id, amount) => {
    setIsLoading(true);

    try {      
      await pobContract.mint(address, id, amount, "0x0000");
      
      onTransferEvent();
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }
  
  const onTransferEvent = () => {
    const event = pobContract.filters.TransferSingle();
    signer.provider.removeListener(event);
    
    signer.provider.on(event, (logs) => {
      const parsedLogs = (new ethers.utils.Interface(pobAbi)).parseLog(logs);
      
      if (address === parsedLogs.args.to) {
        setSuccess(true);
      }
    })
  }
  
	useEffect(() => {
	  if (signer) initPobContract();
	}, [signer])
  
  return (
    <Flex minH='100vh' justify='center' align='flex-start' bg='black' color='gray.200'>
      { success 
        ? 
          <ResultComponent type='pob' /> 
        : 
          <MintComponent mint={mint} isLoading={isLoading} />
      }
    </Flex>
  );
}
