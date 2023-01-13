import React from "react";
import "./styles.css";
export default function HomeScreen() {
  return (
    <div className="container mx-auto px-4 p-5">
      <div className="p-5" style={{ position: "relative" }}>
        <h1 className="text-white text-8xl text-gray-700">Well-Come</h1>
        <h2 className="text-9xl color">DAM</h2>
        <p className="text-white text-gray-500">Digital Assets Marketplace</p>
        <img
          className="hero-img-left"
          src="https://www.transparentpng.com/thumb/networking/networking-free-transparent-png-7.png"
        />
        <img
          className="hero-img"
          src="https://www.transparentpng.com/thumb/networking/networking-free-transparent-png-7.png"
        />
      </div>
    </div>
  );
}
