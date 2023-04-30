import { useState, useEffect } from 'react';
import { Framework } from "@superfluid-finance/sdk-core";
import { Network } from 'alchemy-sdk';
import { useAccount, useSigner } from 'wagmi';
import { /*xdaiAddress, xdaiAbi,*/ n3tfl1xAddress } from '../constants/contracts';
import { ethers } from 'ethers';
import { Center, Flex } from '@chakra-ui/react';
import N3tfl1xComponent from "../components/N3tfl1xComponent";
import ResultComponent from '../components/ResultComponent';

export default function N3tfl1xPage() {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  
  const [sf, setSf] = useState();
  //const [xDAIContract, setxDAIContract] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const initSuperfluid = async () => {
    const sf = await Framework.create({
      chainId: 80001, // mumbai
      provider: signer?.provider
    });
    setSf(sf);
  }
/*
  const initxDAIContract = () => {
    if (!signer) return;
    setxDAIContract(new ethers.Contract(xdaiAddress, xdaiAbi, signer));
  }
*/  
  const subscribe = async () => {
    setIsLoading(true);

    try {
      
      const superSigner = sf.createSigner({ signer: signer });
      const daix = await sf.loadSuperToken("fDAIx");
      //const flowRate = calculateFlowRate("100");
      
      const createFlowOperation = await daix.createFlow({
        sender: address,
        receiver: n3tfl1xAddress,
        flowRate: "38052983537808"// 100 xDAI / monnth
      });
      
      const result = await createFlowOperation.exec(superSigner);
      console.log(result);
      
      setSuccess(true);
      
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }  

  const unsubscribe = async () => {
    setIsLoading(true);

    try {
    
      const superSigner = sf.createSigner({ signer: signer });
      const daix = await sf.loadSuperToken("fDAIx");
      
      const deleteFlowOperation = await daix.deleteFlow({
        sender: address,
        receiver: n3tfl1xAddress
      });
      
      const result = await deleteFlowOperation.exec(superSigner);
      console.log(result);
      
      setSuccess(true);
      
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }
/* 
  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount.toString());
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      console.log(calculatedFlowRate);
      return calculatedFlowRate.toString();
    }
  }
*/  
  useEffect(() => {
    if (signer) initSuperfluid();
  }, [signer]);

  return (
    <Flex minH='100vh' justify='center' align='flex-start' bg='black'>
      { success 
        ? 
          <ResultComponent type='n3tfl1x' /> 
        : 
          <N3tfl1xComponent subscribe={subscribe} unsubscribe={unsubscribe} />
      }
    </Flex>  
  );
}
