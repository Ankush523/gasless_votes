import React from 'react';
import { useContract } from 'wagmi';
import VoteABI from "../SmartContracts/ABIs/VoteABI.json";
import { useSigner } from 'wagmi';

const GetContract = () => {

    const{data:signer}=useSigner();

    const contract = useContract({
        addressOrName: '0x44f454d6C2edc39b716065014fD5c74a98Db7B38',
        contractInterface: VoteABI,
        signerOrProvider: signer,
      })

    return contract;
}
 
export default GetContract;