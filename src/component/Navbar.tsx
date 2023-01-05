import React from "react";
import { Ether } from "../interface";
interface webConnect {
  connectWeb3: () => Promise<void>;
  Ether: Ether;
}
const Navbar: React.FC<webConnect> = (props) => {
  return (
    <nav className="bg-slate-800">
      <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div className="flex items-center justify-between flex-row">
          <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
            <li style={{ marginTop: "-10px" }}>
              <a
                href="/"
                className="text-gray-900 dark:text-white hover:underline"
                aria-current="page"
              >
                <img src="/blockchain.png" width={40} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                NFT's
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                My Asset's
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Purchase Asset's
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900"
            onClick={props.connectWeb3}
            disabled={props.Ether.account.length ? true : false}
          >
            {props.Ether.account.length
              ? `${props.Ether.account.substring(
                  0,
                  4
                )}...${props.Ether.account.substring(
                  props.Ether.account.length - 4,
                  props.Ether.account.length
                )}`
              : "CONNECT"}
            <i className="ml-2 fa-solid fa-wallet"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
