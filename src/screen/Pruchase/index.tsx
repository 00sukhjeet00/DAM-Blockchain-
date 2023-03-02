import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import List from '../../component/List';
import { webConnect } from '../../interface';
import { EtherContext } from '../../utils/EthContext';

export default function PurchaseScreen() {
  const { Ether,setEther } = useContext(EtherContext) as webConnect;
  const [nfts, setnfts] = useState<any>([]);
  useEffect(() => {
    async function loadAssets() {
      if (Ether.market) {
        setEther((prev) => {
          return { ...prev, isLoading: true };
        });
        const itemCount = await Ether?.market?.itemCount();
        let _nfts = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await Ether?.market?.items(i);
          if (item.seller.toLowerCase() == Ether.account.toLowerCase()) {
            if (item.sold) {
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
    loadAssets()
  }, [Ether?.market]);

  return (
    <div className="container mx-auto px-4">
      <List nfts={nfts} disable={true}/>
    </div>
  );
}
