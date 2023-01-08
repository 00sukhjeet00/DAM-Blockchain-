import {  useState } from "react";
import List from "../../component/List";
import { Modal } from "../../component/Modal";
import "./styles.css";

export default function AssetScreen() {
  const [modal, setmodal] = useState<boolean>(false);
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
