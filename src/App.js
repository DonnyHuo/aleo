import Header from "./components/header";
import Footer from "./components/footer";

import React, { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Mine from "./pages/Mine";
import Raise from "./pages/Raise";
import About from "./pages/About";
import Black from "./pages/Black";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { chainList } from "./utils/config";
import { useDispatch } from "react-redux";

function App() {
  const { chainId } = useWeb3ModalAccount();
  const dispatch = useDispatch();

  const checkChain = async () => {
    if (window.ethereum) {
      if (chainId) {
        chainList.map((chain) => {
          if (chain.chainId == chainId) {
            dispatch({
              type: "CHANGE_INVITE_CONTRACT",
              payload: chain.inviteContract,
            });
            dispatch({
              type: "CHANGE_POOL_MANAGER",
              payload: chain.poolManager,
            });
          }
        });
      } else {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const chainIdNow = parseInt(chainId, 16);
        chainList.map((chain) => {
          if (chain.chainId == chainIdNow) {
            dispatch({
              type: "CHANGE_INVITE_CONTRACT",
              payload: chain.inviteContract,
            });
            dispatch({
              type: "CHANGE_POOL_MANAGER",
              payload: chain.poolManager,
            });
          }
        });
      }
    }
  };

  useLayoutEffect(() => {
    checkChain();
  }, [chainId]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mine" element={<Mine />}></Route>
          <Route path="/raise" element={<Raise />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Black" element={<Black />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
