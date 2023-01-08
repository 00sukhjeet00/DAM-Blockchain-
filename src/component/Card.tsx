import React from "react";

export default function Card() {
  return (
    <div className="m-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/blockchain.png"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Block's
          </h5>
        </a>
        <button
          className="w-full text-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-full hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
         <i className="mr-2 fa-brands fa-ethereum"></i>2.00
        </button>
      </div>
    </div>
  );
}
