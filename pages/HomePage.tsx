import Image from 'next/image';
import React from 'react';
import Navbar from '../components/Navbar';
const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <label className='text-[55px] text-purple-800 '>WELCOME TO INDIAS FIRST</label>
            <br/>
            <label className='text-[55px] text-purple-800'>DECENTRALIZED VOTING PLATFORM</label>
            <br/>
            <br/>
            <br/>
            <div className='flex flex-row text-[20px] text-left text-purple-500 justify-around'>
            <p >
                <p className='text-[25px] w-[700px] text-purple-800'>Welcome to VOTECHAIN, where we are revolutionizing the way democratic processes are conducted. Our platform offers a secure, transparent, and tamper-proof way for individuals to cast their votes and have their voices heard.</p>
                
            </p>
            <Image src='/images/undraw_voting_nvu7.svg' alt="voting" width={500} height={500}/>
            </div>
            <br/>
            <br/>
            <p className='text-[40px] text-purple-800'>
                VOTE FROM ANYWHERE, ANY TIME WITHOUT ANY HASSLE
            </p>
            <br/>
        <div className='flex flex-row w-[100vw] h-[fit-content] p-[20px] justify-around'>
            <a href='/voter'><button className='text-[20px] w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl p-[8px] bg-purple-800 text-white'>Continue as Voter</button></a>
            <a href='/candidate'><button className='text-[20px] w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl p-[8px] bg-purple-800 text-white'>Register as Candidate</button></a>
            <a href='/result'><button className='text-[20px] w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl p-[8px] bg-purple-800 text-white'>View Standings</button></a>
        </div>
        </div>
    );
}
 
export default HomePage;