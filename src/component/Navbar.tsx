import React, { useContext, useEffect } from "react";
import { webConnect } from "../interface";
import { EtherContext } from "../utils/EthContext";

const Navbar: React.FC = () => {
  const { Ether, connectWeb3 } = useContext(EtherContext) as webConnect;
  useEffect(() => {
    if(Ether.account===""){
      connectWeb3()
    }
  }, [])
  
  return (
    <nav className="bg-slate-900">
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
                href="/market"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Market
              </a>
            </li>
            <li>
              <a
                href="/assets"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Asset
              </a>
            </li>
            <li>
              <a
                href="/purchase"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Purchase
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900"
            onClick={connectWeb3}
            disabled={Ether.account.length ? true : false}
          >
            {Ether.account.length
              ? `${Ether.account.substring(0, 4)}...${Ether.account.substring(
                  Ether.account.length - 4,
                  Ether.account.length
                )}`
              : window.innerWidth >= 500 && "CONNECT"}
            <i className="lg:ml-2 fa-solid fa-wallet"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
