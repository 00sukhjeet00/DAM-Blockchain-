import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import Empty from "../../component/Empty";
import List from "../../component/List";
import Loading from "../../component/Loading";
import { webConnect } from "../../interface";
import { EtherContext } from "../../utils/EthContext";
import { getEtherPrice } from "../../utils/getEtherPrice";

export default function MarketScreen() {
  const { Ether, setEther } = useContext(EtherContext) as webConnect;
  const [nfts, setnfts] = useState<any>([]);
  const [ethPrice, setethPrice] = useState("")
  useEffect(() => {
    async function loadAssets() {
      setethPrice(await getEtherPrice())
      if (Ether.market) {
        setEther((prev) => {
          return { ...prev, isLoading: true };
        });
        const itemCount = await Ether?.market?.itemCount();
        let _nfts = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await Ether?.market?.items(i);
          if (!item.sold) {
            const uri = await Ether?.nft?.tokenURI(item.tokenID);
            const response = await fetch(uri);
            let res = await response.json();
            res.total_price = ethers.utils.formatEther(
              (await Ether.market.getTotalPrice(item.id)).toString()
            );
            if (item.seller.toLowerCase() == Ether.account.toLowerCase()) {
              res.disable=true
            }
            _nfts.push(res);
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
      {Ether.isLoading ? <Loading /> :nfts.length? <List nfts={nfts} ethPrice={ethPrice}/>:<Empty/>}
    </div>
  );
}
