import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import List from '../../component/List';
import { webConnect } from '../../interface';
import { EtherContext } from '../../utils/EthContext';

export default function PurchaseScreen() {
  const { Ether } = useContext(EtherContext) as webConnect;
  console.log('Ether: ', Ether);
  const [nfts, setnfts] = useState<any>([]);
  useEffect(() => {
    async function loadAssets() {
      if (Ether.market) {
        const filter=await Ether.market.events
        console.log('filter: ', filter);
      }
    }
    loadAssets();
  }, [Ether?.market]);

  return (
    <div className="container mx-auto px-4">
      {/* <List nfts={nfts} disable={true}/> */}
    </div>
  );
}
