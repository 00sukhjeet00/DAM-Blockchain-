import React, { useState } from "react";
import { ethers } from "ethers";
import Market from "./contractsData/Market-address.json";
import MarketABI from "./contractsData/Market.json";
import NFT from "./contractsData/NFT-address.json";
import NFTABI from "./contractsData/NFT.json";
import Navbar from "./component/Navbar";
import { Ether } from "./interface";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./component/Loading";
const HomeScreen = React.lazy(() => import("./screen/Home"));
const MarketScreen = React.lazy(() => import("./screen/Market"));
const PurchaseScreen = React.lazy(() => import("./screen/Pruchase"));
const AssetScreen = React.lazy(() => import("./screen/Assets"));

function App() {
  const [Ether, setEther] = useState<Ether>({
    account: "",
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
    <React.Suspense fallback={<Loading/>}>
      <BrowserRouter>
        <Navbar connectWeb3={connectWeb3} Ether={Ether} />
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/market" element={<MarketScreen/>} />
          <Route path="/purchase" element={<PurchaseScreen/>} />
          <Route path="/assets" element={<AssetScreen/>} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
