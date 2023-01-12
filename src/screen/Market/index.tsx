import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import List from '../../component/List';
import { webConnect } from '../../interface'
import { EtherContext } from '../../utils/EthContext'

export default function MarketScreen() {
  const { Ether } = useContext(EtherContext) as webConnect;
  const [nfts, setnfts] = useState<any>([]);
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
          if (!item.sold) {
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
      <List nfts={nfts}/>
    </div>
  );
}
