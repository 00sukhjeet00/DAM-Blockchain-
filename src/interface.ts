import { ethers } from "ethers";

export interface Ether{
    account:string,
    nft:ethers.Contract|null,
    market:ethers.Contract|null,
    isLoading:boolean
  }