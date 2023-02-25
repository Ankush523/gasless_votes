import React from 'react'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { useAccount, useSigner } from "wagmi";
import Voteabi from "../SmartContracts/ABIs/VoteABI.json";
import Link from 'next/link';

const Voterdetails = () => {

    const [name, setName] = useState("")
    const [age, setAge] = useState<String>('');
    const [contactnumber, setContactnumber] = useState<String>('');
    const [sex, setSex] = useState("");

    const { data: signer } = useSigner();
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



    const voterdetails = async () => {
        if (!smartAccount) {
            return;
        }
        if(name !== '' && age !== null && contactnumber !== null && sex !== '')
        {
            let iface = new ethers.utils.Interface(Voteabi)
            let det = iface.encodeFunctionData("userregister",[name, age, contactnumber, sex])
            console.log(det)
            await smartAccount.init();
            console.log("Smart Account", smartAccount);
            const tx={
            to:"0x44f454d6C2edc39b716065014fD5c74a98Db7B38",
            from:smartAccount.address,
            value:ethers.utils.parseEther("0"),
            data:det
            }
            const txResponse = await smartAccount.sendGaslessTransaction({ transaction: tx });
            console.log(txResponse);
        }
        else
        {
            alert("Fill All Details")
        }
    }
  return (
    <div className='bg-white h-[100vh]'>
      <div className="flex flex-row justify-between  mx-[40px]">
        <label className="text-[55px] text-purple-800 ">WELCOME TO VOTER PORTAL</label>
        {/* <button className="text-xl text-white bg-purple-800 my-[20px] px-[20px] rounded-xl shadow-2xl border border-purple-800 hover:text-purple-800 hover:bg-white" onClick={() => login()}>Smart Wallet : {(scwAddress.toString()).slice(0,8)}...{(scwAddress.toString()).slice(37)}</button> */}
        {scwLoading && <h2 className='text-black'>Loading Smart Account...</h2>}
        {scwAddress && (
            <div>
                <h2 className='text-black'>Smart Account Address</h2>
                <p className='text-black'>{swAddress}</p>
            </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center w-[100vw] h-[fit-content] p-[20px] justify-center px-20">
        <div className='flex flex-col w-[60%] h-[fit-content] shadow-xl rounded-md bg-slate-100 p-[30px]'>
      <label className=" text-[30px] mb-10 text-purple-900">Enter Your Details </label>
        <div className="flex flex-row p-5 justify-between">
        <label className="   w-[fit-content] p-1 px-2 py-2 text-[20px] text-purple-600">Name:</label>
          <input className="rounded-xl shadow-xl w-[250px]" required type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>

        <div className="flex flex-row p-5 justify-between">
        <label className="   w-[fit-content] p-1 px-2 py-2 text-[20px] text-purple-600">Age:</label>
          <input className="rounded-xl shadow-xl w-[250px]" type="number" required min="18" name="age" onChange={(e) => setAge(e.target.value)}/>
          </div>

        <div className="flex flex-row p-5 justify-between">
        <label className="   w-[fit-content] p-1 px-2 py-2 text-[20px] text-purple-600">Contact Number:</label>
          <input className="rounded-xl shadow-xl w-[250px]" required type="number" name="contactnumber" onChange={(e) => setContactnumber(e.target.value)}/>
          </div>

        <div className="flex flex-row p-5 justify-between">
        <label className="   w-[fit-content] p-1 px-2 py-2 text-[20px] text-purple-600">Gender:</label>
          <input className="rounded-xl shadow-xl w-[250px]" required type="text" name="sex" value={sex} onChange={(e) => setSex(e.target.value)}/>
          </div>
          <div className="pt-8">
          <button type="submit" className="text-[20px] text-purple-800 w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl px-[40px] py-[10px] border border-purple-800 ml-[40%] bg-white" onClick={()=>voterdetails()}>Submit</button>
          </div>
        </div>
      </div>
      <div className="ml-[45%]">
        <Link href='/CandidateList'><button className="  text-[20px] w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl p-[8px] bg-purple-800 text-white ">Continue to Vote</button></Link>
      </div>
    </div>
    </div>
  )
}

export default Voterdetails