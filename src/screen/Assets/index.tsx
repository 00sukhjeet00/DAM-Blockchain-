import { useContext, useEffect, useState } from "react";
import List from "../../component/List";
import { Modal } from "../../component/Modal";
import { webConnect } from "../../interface";
import { EtherContext } from "../../utils/EthContext";
import { Buffer } from "buffer";
import "./styles.css";
import { ethers } from "ethers";
import Loading from "../../component/Loading";
import Empty from "../../component/Empty";

export default function AssetScreen() {
  const [modal, setmodal] = useState<boolean>(false);
  const { Ether, setEther } = useContext(EtherContext) as webConnect;
  const [nfts, setnfts] = useState<any>([]);
  const [itemID, setitemID] = useState(0)
  useEffect(() => {
    async function loadAssets() {
      if (Ether.market) {
        setEther((prev) => {
          return { ...prev, isLoading: true };
        });
        const itemCount = await Ether?.market?.itemCount();
        const id=ethers.BigNumber.from(itemCount)
        setitemID(id.toNumber()+1)
        let _nfts = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await Ether?.market?.items(i);
          if (item.seller.toLowerCase() == Ether.account.toLowerCase()) {
            if (!item.sold) {
              const uri = await Ether?.nft?.tokenURI(item.tokenID);
              const response = await fetch(uri);
              let res = await response.json();
              res.total_price = ethers.utils.formatEther(
                (await Ether.market.getTotalPrice(item.id)).toString()
                );
                _nfts.push(res);
              }
          }
        }
        setnfts(_nfts);
        setEther((prev) => {
          return { ...prev, isLoading: false };
        });
      }
    }
    loadAssets();
  }, [Ether?.market]);

  return (
    <div className="container mx-auto px-4">
      {Ether.isLoading ? (
        <Loading />
      ) : (
        <>
          <button
            className="text-white bg-teal-700 hover:bg-teal-800 rounded-full btn"
            onClick={() => {
              setmodal(true);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          {nfts.length?<List nfts={nfts} disable={true} />:<Empty/>}
          {modal && <Modal setmodal={setmodal} itemID={itemID}/>}
        </>
      )}
    </div>
  );
}
