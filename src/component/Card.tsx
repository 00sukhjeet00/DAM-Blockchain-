import { ethers } from "ethers";
import React, { useContext } from "react";
import { webConnect } from "../interface";
import { EtherContext } from "../utils/EthContext";
import "./styles.css";
export default function Card(props: {
  nft: any;
  id: number;
  disable?: boolean;
}) {
  const { Ether } = useContext(EtherContext) as webConnect;
  const buyNFT = async () => {
    console.log('nft: ', props.nft.id);
    await (
      await Ether?.market?.purchaseItem(props.nft.id, {
        value: ethers.utils.parseEther(props.nft.total_price),
      })
      ).wait();
      window.location.reload()
    };
  return (
    <div
      className="m-2 max-w-sm bg-white rounded-lg shadow-md dark:bg-slate-800 dark:border-gray-700"
      style={{ overflow: "hidden" }}
    >
      <div style={{ position: "relative" }}>
        <img className="rounded-t-lg zoom" src={props.nft.file} alt="" />
        <div className="grad-color"></div>
      </div>
      <div className="p-2">
        <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.nft.name}
        </h5>
        <p className="mb-1 text-gray-400">{props.nft.describe}</p>
      </div>
        <button
          className="w-full text-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-color"
          onClick={buyNFT}
          disabled={props?.disable}
        >
          <i className="mr-2 fa-brands fa-ethereum"></i>
          {props.nft.total_price}
        </button>
    </div>
  );
}
