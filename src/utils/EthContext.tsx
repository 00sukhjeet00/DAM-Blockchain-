import { ethers } from "ethers";
import React, {createContext, useState } from "react";
import { Ether, webConnect } from "../interface";
import Market from "../contractsData/Market-address.json";
import MarketABI from "../contractsData/Market.json";
import NFT from "../contractsData/NFT-address.json";
import NFTABI from "../contractsData/NFT.json";
interface Props{
  children:React.ReactNode;
}
export const EtherContext = createContext<webConnect | null>(null);
export const EtherProvider :React.FC<Props>= ({children}) => {
  let data=localStorage.getItem("data")
  data=data?JSON.parse(data):null
  const [Ether, setEther] = useState<Ether>({
    account:"",
    nft: null,
    market: null,
    isLoading: false,
  });
  console.log('Ether: ', Ether);
  const connectWeb3 = async () => {
    setEther({ ...Ether, isLoading: true });
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setEther((prev) => {
      return { ...prev, account: account[0] };
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    loadContract(signer);
  };
  const loadContract = async (signer: ethers.providers.JsonRpcSigner) => {
    const market = new ethers.Contract(Market.address, MarketABI.abi, signer);
    setEther((prev) => {
      return { ...prev, market };
    });
    const nft = new ethers.Contract(NFT.address, NFTABI.abi, signer);
    setEther((prev) => {
      return { ...prev, nft, isLoading: false };
    });
  };
  return (
    <EtherContext.Provider value={{Ether, connectWeb3}}>
      {children}
    </EtherContext.Provider>
  );
};
