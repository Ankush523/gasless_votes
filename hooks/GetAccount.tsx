import * as React from 'react';
import { useAccount } from 'wagmi';

const GetAccount = () => {

const { address, isConnecting, isDisconnected } = useAccount()
  return address ;
};

export default GetAccount;