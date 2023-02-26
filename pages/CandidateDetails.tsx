import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useProvider, useSigner } from 'wagmi';
import Voteabi from "../SmartContracts/ABIs/VoteABI.json"
const CandidateDetails = () => {

    const[name,setName] = useState('');
    const[partyname,setPartyname] = useState('');
    const[age,setAge] = useState('');
    const[region,setRegion] = useState('');
    
    const provider = useProvider();
    const {data:signer} = useSigner();
    const contract = new ethers.Contract("0xEDa8aD32Ef9BD4b79ADD514892591673819E73A5", Voteabi, signer||provider);

    const candidatedetails = async () => {
        if(name !== null && partyname !== null && age !== null && region !== null){
          await contract.candidateregister(name, partyname, age, region);
        }else{
          alert("Fill All Details")
        }
    };

  return (
        <div className='bg-white h-[100vh]'>
            <div className='flex flex-row justify-between  mx-[40px]'>
                <label className="text-[55px] text-purple-800 ">WELCOME TO CANDIDATE PORTAL</label>
                <div className='mt-[1%]'>
                    <ConnectButton/>
                </div>
            </div>
        <div className='p-4'>
            <div className='flex flex-col items-center justify-center w-[100vw] p-[20px] h-[fit-content] px-20'>
                <div className='flex flex-col w-[60%] h-[fit-content] shadow-xl rounded-md bg-slate-100 p-[30px]'>
                <label className=" text-[30px] mb-10 text-purple-900 pl-[38%]  border-b border-b-purple-700">Enter Your Details </label>
                    <div className="flex flex-row p-5  justify-between">
                        <label className="  w-[fit-content] px-2 py-2 text-[20px] text-purple-600">Name : </label>
                        <input className="rounded-xl shadow-xl w-[250px]" required type="text" value={name} name="name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="flex flex-row p-5  justify-between">
                        <label className="  w-[fit-content]  px-2 py-2 text-[20px] text-purple-600">PartyName : </label>
                        <input className="rounded-xl shadow-xl w-[250px]" required type="text" value={partyname} name="partyname" onChange={(e) => setPartyname(e.target.value)}/>
                    </div>
                    <div className="flex flex-row p-5  justify-between">
                        <label className="  w-[fit-content]  px-2 py-2 text-[20px] text-purple-600">Age : </label>
                        <input className="rounded-xl shadow-xl w-[250px]" required type="number" value={age} name="age" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div className="flex flex-row p-5  justify-between">
                        <label className="  w-[fit-content]  px-2 py-2 text-[20px] text-purple-600">Representing Region : </label>
                        <input className="rounded-xl shadow-xl w-[250px]" required type="text" value={region} name="region" onChange={(e) => setRegion(e.target.value)}/>
                    </div>
                    <div className='pt-8'>
                        <button className="text-[20px] text-purple-800 w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl px-[40px] py-[10px] border border-purple-800 ml-[40%] bg-white" onClick={()=>candidatedetails()}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CandidateDetails