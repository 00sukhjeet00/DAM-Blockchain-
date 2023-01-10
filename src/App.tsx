import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./component/Loading";
import { EtherProvider } from "./utils/EthContext";
const HomeScreen = React.lazy(() => import("./screen/Home"));
const MarketScreen = React.lazy(() => import("./screen/Market"));
const PurchaseScreen = React.lazy(() => import("./screen/Pruchase"));
const AssetScreen = React.lazy(() => import("./screen/Assets"));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <EtherProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/market" element={<MarketScreen />} />
            <Route path="/purchase" element={<PurchaseScreen />} />
            <Route path="/assets" element={<AssetScreen />} />
          </Routes>
        </EtherProvider>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
