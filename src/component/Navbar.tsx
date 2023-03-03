import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <nav className="relative" style={{background:"#0f172a90"}}>
      <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div className="flex items-center justify-between flex-row">
          <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
            <li style={{ marginTop: "-10px" }}>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:underline"
                aria-current="page"
              >
                <img src="/blockchain.png" width={40} />
              </Link>
            </li>
            <li>
              <Link
                to="/market"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Market
              </Link>
            </li>
            <li>
              <Link
                to="/assets"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Asset
              </Link>
            </li>
            <li>
              <Link
                to="/purchase"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Purchase
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="bg-color focus:outline-none text-white focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
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

