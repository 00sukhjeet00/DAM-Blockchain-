import React, { useState } from 'react';
import {ethers} from 'ethers'
import Market from './contractsData/Market-address.json'
import MarketABI from './contractsData/Market.json'
import NFT from './contractsData/NFT-address.json'
import NFTABI from './contractsData/NFT.json'
import Navbar from './component/Navbar';
interface Ether{
  account:string,
  nft:ethers.Contract|null,
  market:ethers.Contract|null,
  isLoading:boolean
}
function App() {
  const [Ether, setEther] = useState<Ether>({
    account:'',
    nft:null,
    market:null,
    isLoading:false
  })
  console.log('Ether: ', Ether);
  const connectWeb3=async()=>{
    setEther({...Ether,isLoading:true})
    const account=await window.ethereum.request({method:"eth_requestAccounts"}) 
    setEther(prev=>{return{...prev,account:account[0]}})
    const provider=new ethers.providers.Web3Provider(window.ethereum)
    const signer=provider.getSigner()
    loadContract(signer)
  }
  const loadContract=async(signer:ethers.providers.JsonRpcSigner)=>{
    const market=new ethers.Contract(Market.address,MarketABI.abi,signer)
    setEther(prev=>{return{...prev,market}})
    const nft=new ethers.Contract(NFT.address,NFTABI.abi,signer)
    setEther(prev=>{return{...prev,nft,isLoading:false}})
  }
  return (
    <div>
      <Navbar connectWeb3={connectWeb3}/>
    </div>
  );
}

export default App;
