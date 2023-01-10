import { useContext, useEffect, useState } from "react";
import List from "../../component/List";
import { Modal } from "../../component/Modal";
import { webConnect } from "../../interface";
import { EtherContext } from "../../utils/EthContext";
import "./styles.css";

export default function AssetScreen() {
  const [modal, setmodal] = useState<boolean>(false);
  const { Ether } = useContext(EtherContext) as webConnect;
  useEffect(() => {
    async function loadAssets() {
      if (Ether.market) {
        const itemCount = await Ether?.market?.itemCount();
        console.log("ETH:", await Ether?.market?.itemCount());
        for (let i = 1; i <= itemCount; i++) {
          const item = await Ether?.market?.items(i);
          console.log("item: ", item);
        }
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
      <List />
      {modal && <Modal setmodal={setmodal} />}
    </div>
  );
}
