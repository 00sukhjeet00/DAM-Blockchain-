import { useContext, useEffect, useState } from "react";
import List from "../../component/List";
import { Modal } from "../../component/Modal";
import { webConnect } from "../../interface";
import { EtherContext } from "../../utils/EthContext";
import { Buffer } from "buffer";
import "./styles.css";
import { ethers } from "ethers";

export default function AssetScreen() {
  const [modal, setmodal] = useState<boolean>(false);
  const { Ether } = useContext(EtherContext) as webConnect;
  const [nfts, setnfts] = useState<any>([]);
  console.log("nfts: ", nfts);
  useEffect(() => {
    async function loadAssets() {
      if (Ether.market) {
        const itemCount = await Ether?.market?.itemCount();
        console.log("itsemCount: ", itemCount.toString());
        let _nfts = [];
        for (let i = 1; i <= itemCount; i++) {
          console.log("i: ", i);
          const item = await Ether?.market?.items(i);
          console.log("item: ", item);
          if (item.seller==Ether.account) {
            const uri = await Ether?.nft?.tokenURI(item.tokenID);
            console.log("uri: ", uri);
            const response = await fetch(uri);
            let res = await response.json();
            console.log("response: ", res);
            res.total_price = ethers.utils.formatEther(
              (await Ether.market.getTotalPrice(item.id)).toString()
            );
            _nfts.push(res);
          }
        }
        setnfts(_nfts);
      }
    }
    loadAssets();
  }, [Ether?.market]);

  return (
    <div className="container mx-auto px-4">
      <button
        className="text-white bg-teal-700 hover:bg-teal-800 rounded-full btn"
        onClick={() => {
          setmodal(true);
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <List nfts={nfts} disable={true}/>
      {modal && <Modal setmodal={setmodal} />}
    </div>
  );
}
