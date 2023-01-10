import { ethers } from "ethers";

export interface Ether{
    account:string,
    nft:ethers.Contract|null,
    market:ethers.Contract|null,
    isLoading:boolean
  }
export  interface webConnect {
    connectWeb3: () => Promise<void>;
    Ether: Ether;
  }