import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
const Navbar = () => {
    return (
        <div className='flex flex-row w-[100vw] h-[fit-content] p-[20px] justify-between'>
            <label className='font-montserrat text-[50px] text-purple-900 font-light p-2 text-center text-2xl rounded-full' >
                VoteChain
            </label>
            <ConnectButton/>
        </div>
    );
}
 
export default Navbar;