import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { useContext, useState } from "react";
import { EtherContext } from "../utils/EthContext";
import { ethers } from "ethers";
const auth =
  "Basic " +
  Buffer.from(
    process.env.REACT_APP_INFURA_ID +
      ":" +
      process.env.REACT_APP_INFURA_SECRET_KEY
  ).toString("base64");
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
export const Modal = (props) => {
  const [form, setform] = useState({
    name: "",
    file: "",
    describe: "",
    price: 1,
    id: props.itemID,
    sellerName: localStorage.getItem("userName") ?? "",
  });
  console.log("props.itemCount: ", props.itemID);
  const { Ether, setEther } = useContext(EtherContext);
  const UploadIFS = async (e) => {
    e.preventDefault();
    try {
      const response = await client.add(e.target.files[0]);
      setform((prev) => {
        return {
          ...prev,
          file: `https://ipfs.io/ipfs/${response.path}`,
        };
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const createNFT = async () => {
    try {
      setEther((prev) => {
        return { ...prev, isLoading: true };
      });
      const response = await client.add(JSON.stringify(form));
      const uri = `https://ipfs.io/ipfs/${response.path}`;
      await (await Ether.nft.mint(uri)).wait();
      const tokenID = await Ether.nft.tokenID();
      await (
        await Ether.nft.setApprovalForAll(Ether.market.address, true)
      ).wait();
      const listingPrice = ethers.utils.parseEther(form.price.toString());
      await (
        await Ether.market.makeItem(
          Ether.nft.address,
          tokenID,
          listingPrice,
          form.sellerName
        )
      ).wait();
      setEther((prev) => {
        return { ...prev, isLoading: false };
      });
      localStorage.setItem("userName",form.sellerName)
      window.location.reload();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div className="modal">
      <div
        className="lg:w-6/12 w-11/12 "
        style={{ margin: "0 auto", paddingTop: "10%" }}
      >
        <button
          className="text-white bg-teal-700 hover:bg-teal-800 rounded-full cross-btn"
          onClick={() => {
            props.setmodal(false);
          }}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </button>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={form.name}
            onChange={(e) =>
              setform((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            File
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => UploadIFS(e)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={form.describe}
            onChange={(e) =>
              setform((prev) => {
                return { ...prev, describe: e.target.value };
              })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seller Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={form.sellerName}
            onChange={(e) =>
              setform((prev) => {
                return { ...prev, sellerName: e.target.value };
              })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={form.price}
            onChange={(e) => {
              if (Number(e.target.value) >= 1)
                setform((prev) => {
                  return { ...prev, price: Number(e.target.value) };
                });
            }}
            required
          />
        </div>
        <button
          type="button"
          className="focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900"
          onClick={createNFT}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
