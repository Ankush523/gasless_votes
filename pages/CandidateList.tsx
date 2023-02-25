import React from 'react'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { useAccount, useSigner, useProvider } from "wagmi";
import Voteabi from "../SmartContracts/ABIs/VoteABI.json";
const CandidateList = () => {

    const provider = useProvider();
    const {data:signer} = useSigner();
    const contract = new ethers.Contract("0x44f454d6C2edc39b716065014fD5c74a98Db7B38", Voteabi, signer||provider);


    const { address } = useAccount();
    const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
    const [scwAddress, setScwAddress] = useState("");
    const [scwLoading, setScwLoading] = useState(false);
    const [swAddress, setSwAddress] = useState("");

    const sAddress = smartAccount?.address;
    console.log("address", sAddress);

    useEffect(() => {
        async function setupSmartAccount() {
          setScwAddress("");
          setScwLoading(true);
          const walletProvider = new ethers.providers.Web3Provider(
            (signer?.provider as any).provider
          );
          const smartAccount = new SmartAccount(walletProvider, {
            activeNetworkId: ChainId.GOERLI,
            supportedNetworksIds: [ChainId.GOERLI],
          });
          await smartAccount.init();
          const context = smartAccount.getSmartAccountContext();
          setScwAddress(context.baseWallet.getAddress());
          console.log("Smart Account Address", context.baseWallet.getAddress());
          setSmartAccount(smartAccount);
          console.log("Smart Account", smartAccount.address);
          setSwAddress(smartAccount.address);
          setScwLoading(false);
        }
        if (!!signer?.provider && !!address) {
          setupSmartAccount();
          console.log("Provider...", signer?.provider);
        }
      }, [address, signer?.provider]);

      const [lists, setList] = useState<Object[]>([]);

      const getList = async () => {
        var len = await contract.receiveCid();
        console.log(len.toString());
        var parseList = len.toString();

        setList([]);
        for (let i = 1; i <= parseList; i++) {
        var list = await contract.candidatelist(i);
        console.log(list);
        setList((lists) => [...lists, list]);
        }
    };

        const chooseCandidate = async (key:string) => {
            console.log("Key", key);
            if (!smartAccount) {
                console.log("Smart Account not initialized");
                return;
            }
            var len = await contract.receiveCid();
            let iface = new ethers.utils.Interface(Voteabi);
            let det = iface.encodeFunctionData("votecount", [len]);
            console.log(det);
            await smartAccount.init();
            console.log("Smart Account", smartAccount);
            const tx={
            to:"0x44f454d6C2edc39b716065014fD5c74a98Db7B38",
            from:smartAccount.address,
            value:ethers.utils.parseEther("0"),
            data:det
            }
            const txResponse2 = await smartAccount.sendGaslessTransaction({ transaction: tx });
            console.log(txResponse2);
        }


  return (
    <div className="flex flex-col bg-purple-900 h-fit items-center justify-center h-screen">
            <br />
            <br />
            <button className="text-[20px]  w-[fit-content] h-[fit-content] rounded-xl hover:shadow-xl p-[8px] bg-white text-purple-800" onClick={() => getList()}>Get List of Candidates</button>
            <br />
            <div className="w-[50%] h-[fit-content] shadow-xl rounded-xl bg-white p-[30px]">
                <div className="pb-[50px]">
                    <label className="text-[25px]  shadow-xl text-white bg-purple-800 w-[fit-content] py-2 px-4 rounded-xl ml-[38%]">Candidate List</label>
                </div>
                <div className='flex flex-row w-[100%]  justify pb-5 text-[20px] border-b border-b-purple-800'>
                    <label className='text-purple-600 text-left w-[20%]'>Leader</label>
                    <label className='text-purple-600 text-center w-[21%]'>Party</label>
                    <label className='text-purple-600 w-[21%]'>Age</label>
                    <label className='text-purple-600 w-[21%]'>Region</label>
                    <label className='text-purple-600 w-[20%]'>Vote</label>
                </div>
                <div className="flex flex-col-reverse w-[100%] h-[fit-content] pt-5">
                    {lists.map((list, index) => (
                    <div key="id" className="mb-[40px]">
                        <div className="flex flex-row w-[100%] p-1">
                            <label className=" w-[20%] text-left font-semi-bold text-[20px] text-black">{list.name}</label>
                            <label className=" w-[20%] text-center font-semi-bold text-[20px] text-black">{list.party_name}</label>
                            <label className=" w-[20%] font-semi-bold text-[20px] text-black">{(list.age).toString()}</label>
                            <label className=" w-[20%] font-semi-bold text-[20px] text-black">{list.region}</label>
                            <button className="bg-purple-100 px-3 w-[10%] border border-purple-800 shadow-xl rounded-md hover:bg-purple-300 text-purple-800" onClick={() => chooseCandidate(index+1)}>Vote</button>
                        </div>
                    </div>
                    )
                )}
                </div>
            </div>
        </div>
  )
}

export default CandidateList