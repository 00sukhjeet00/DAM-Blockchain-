import React from "react";
interface webConnect{
    connectWeb3:() => Promise<void>
}
const Navbar:React.FC<webConnect>=(props) =>{
  return (
    <nav className="bg-slate-800">
      <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div className="flex items-center justify-between flex-row">
          <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
                aria-current="page"
              >
                <img src="/blockchain.png" width={40}/>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Company
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Features
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900"
            onClick={props.connectWeb3}
          >
            CONNECT
            <i className="ml-2 fa-solid fa-wallet"></i>
          </button>
        </div>
        {/* <div className="flex"> */}
        {/* </div> */}
      </div>
    </nav>
  );
}
export default Navbar