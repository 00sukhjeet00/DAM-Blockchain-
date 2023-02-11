import React from "react";
import "./styles.css";
export default function HomeScreen() {
  return (
    <div className="container mx-auto px-4 p-5">
      <div className="p-5" style={{ position: "relative" }}>
        <h1 className="text-8xl text-slate-300">Well-Come</h1>
        <h2 className="text-9xl color">DAM</h2>
        <p className="text-gray-500">Digital Assets Marketplace</p>
        <p className="text-xs text-gray-500">(Powered By Blockchain)</p>
        <img
          className="hero-img-left"
          src="https://www.transparentpng.com/thumb/networking/networking-free-transparent-png-7.png"
        />
        <img
          className="hero-img-1"
          src="https://www.transparentpng.com/thumb/networking/networking-free-transparent-png-7.png"
        />
        <img
          className="hero-img"
          src="https://www.transparentpng.com/thumb/networking/networking-free-transparent-png-7.png"
        />
        <button
          className="text-white float-right p-3 ease-in-out w-1/3 rounded-full z-10 relative bg-color"
          onClick={() => window.location.href="/market"}
        >
          EXPLORE MARKET
        </button>
      </div>
    </div>
  );
}
