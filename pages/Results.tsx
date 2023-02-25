import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useProvider, useSigner } from 'wagmi';
import Voteabi from "../SmartContracts/ABIs/VoteABI.json"
const Results = () => {

    const provider = useProvider();
    const {data:signer} = useSigner();
    const contract = new ethers.Contract("0x44f454d6C2edc39b716065014fD5c74a98Db7B38", Voteabi, signer||provider);
    const[lists,setList] = useState<Object[]>([]);
    
    const getList = async() => {
        var len = await contract.receiveCid();
        var parseList = len.toString();

        setList([]);
        for(let i=1;i<=parseList;i++)
        {
            var list = await contract.candidatelist(i);
            setList((lists) => [...lists,list])
        }
    }

    return (
        <div className='flex flex-col bg-purple-900 items-center justify-center h-[100vh]'>
            <br/>
            <br/>
            <button className='text-[20px] w-[fit-content] h-[fit-content] rounded-xl hover:shadow-xl p-[8px] bg-white text-purple-800' onClick={getList}>View Standings</button>
            <br/>
            <div className='w-[50%] h-[fit-content] shadow-xl rounded-xl bg-white p-[40px]'>
                <div className='pb-[50px]'>
                    <label className='text-[25px] shadow-xl text-white bg-purple-800 w-[fit-content] py-2 px-4 mx-[35%] rounded-xl'>Current Standings</label>
                </div>
                <div className='flex flex-row w-[100%] justify-around pb-10 text-[30px]'>
                        <label className='text-purple-600'>Political Leader Name</label>
                        <label className='text-purple-600'>Votes Received</label>
                        </div>
                <div className='flex flex-col-reverse w-[100%] h-[fit-content]' >
                {

                    lists.map((list,index)=>(
                        <div key={index} className=''>
                            <div className='flex flex-row w-[100%] justify-around p-1 '>
                            <label className='font-semi-bold text-[20px] text-purple-800'>{lists[index].name} - ({lists[index].party_name})</label>
                            <label className='font-semi-bold text-[20px] text-purple-800'>{(lists[index].count).toString()}</label>
                            </div>
                        <br/>
                        <br/>
                        <br/>
                        </div>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Results;