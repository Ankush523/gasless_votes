import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Navbar from '../components/Navbar';
const HomePage = () => {
    return (
        <div className='bg-white h-[100vh]'>
            <Navbar/>
            <div className='flex flex-col justify-center mb-[8%] mt-[2%]'>
                <label className='text-6xl text-purple-800 mx-[25%]'>WELCOME TO INDIAS FIRST </label>
                <label className='text-7xl text-purple-800 mx-[14%]'>DECENTRALIZED VOTING PLATFORM</label>
            </div>
            <div className='flex flex-row text-[20px] text-left text-purple-500 justify-around'>
                <p className='text-[25px] w-[700px] text-purple-800'>Welcome to VOTECHAIN, where we are revolutionizing the way democratic processes are conducted. Our platform offers a secure, transparent, and tamper-proof way for individuals to cast their votes and have their voices heard.</p>
                <img className='w-[30vw] h-[35vh]' src='https://scientifica.ch/wp-content/uploads/2021/07/119_provotum-system-xtra-small.png'/>
            </div>

            <p className='text-[40px] text-purple-800 ml-[17%]'>
                VOTE FROM ANYWHERE, ANY TIME WITHOUT ANY HASSLE
            </p>
            <br/>
        <div className='flex flex-row w-[100vw] h-[fit-content] p-[20px] justify-around'>
            <Link href='/VoterDetails'><button className='text-[20px] w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl p-[8px] bg-purple-800 text-white'>Continue as Voter</button></Link>
            <Link href='/CandidateDetails'><button className='text-[20px] w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl p-[8px] bg-purple-800 text-white'>Register as Candidate</button></Link>
            <Link href='/result'><button className='text-[20px] w-[fit-content] h-[fit-content] rounded-md hover:shadow-xl p-[8px] bg-purple-800 text-white'>View Standings</button></Link>
        </div>
        </div>
    );
}
 
export default HomePage;