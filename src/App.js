// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/********************* COMPONENTS ********************/
import Navbar from "./components/Navbar";
// import { navrbarItem } from "./components/users/NavbarItem";
import Home from "./components/homepage/Home";
import LiveSports from "./components/stream/LiveSports";
import CreateStream from "./components/stream/CreateStream";
import ScheduledStreams from "./components/schedulestreams/ScheduledStreams";
import AllStreams from "./components/stream/AllSports";
import AllArtists from "./components/users/AllArtists";
import AllNfts from "./components/nft/AllNfts";
import MakeSchedule from "./components/schedulestreams/MakeSchedule";
import SingleUser from "./components/users/SingleUser";
import Profile from "./components/users/Profile";
import CreateNft from "./components/users/generalblocks/CreateNft";
import CreateN from "./components/users/CreateN";
import { ConnectKitButton } from "connectkit";
/********************* CSS CLASS ********************/
import "./index.css";
import "./App.css";

import { useAccount } from "wagmi";
import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import onebeat from "./artifacts/contracts/CatchMyGame.sol/CatchMyGame.json";

import metamask from "./components/mm.png";
import coinbase from "./components/wc.png";

// const contractAddress = "0xC0203f1dDdE0bC3FEB62a79c1aB5c5be2c4d8Ca2";
const contractAddress = "0x066eB72D61ae47921300005B506502a1a503DeC5";

function App() {
  // const { activate, deactivate } = useWeb3React();
  const [openWalletOption, setOpenWalletOption] = useState(false);
  // const [address, setAddress] = useState("");
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  // const [isConnected, setIsConnected] = useState(false);

  //
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});
  let [error, setErr] = useState(null);

  const { address } = useAccount();
  console.log(address);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  console.log(signer);
  // const web3Handler = async () => {
  //   let accounts = await window.ethereum
  //     .request({
  //       method: "eth_requestAccounts",
  //     })
  //     .catch((err) => {
  //       error = err.code;
  //       setErr(error);
  //     });
  //   setAccount(connected);
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   let networkName = await provider.getNetwork();
  //   let chainId = networkName.chainId;
  //   window.ethereum.on("chainChanged", (chainId) => {
  //     window.location.reload();
  //   });

  // };

  console.log(address);

  const loadContracts = async (signer) => {
    const c = new ethers.Contract(contractAddress, onebeat.abi, signer);
    setContract(c);
    setLoading(false);
    console.log(contract);
    // console.log("token")
    // console.log(tokenContract)
    // console.log("contract")
    // console.log(maincontract)
  };
  useEffect(() => {
    loadContracts(signer);
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Navbar setOpenWalletOption={setOpenWalletOption} />
          {/* <div className="main-content"> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/" element={<Stream />} /> */}
            <Route
              exact
              path="/live-stream"
              element={<LiveSports contract={contract} account={address} />}
            />
            <Route
              exact
              path="/create-stream"
              element={<CreateStream contract={contract} account={address} />}
              account
            />
            <Route
              exact
              path="/schedule-stream"
              element={
                <ScheduledStreams contract={contract} account={address} />
              }
            />
            <Route
              exact
              path="/streams"
              element={<AllStreams contract={contract} account={address} />}
            />
            <Route
              exact
              path="/all-artists"
              element={<AllArtists contract={contract} account={address} />}
            />
            <Route
              exact
              path="/all-nfts"
              element={<AllNfts contract={contract} account={address} />}
            />
            <Route
              exact
              path="/make-schedule"
              element={<MakeSchedule contract={contract} account={address} />}
            />
            <Route
              exact
              path="/user/"
              element={<SingleUser contract={contract} account={address} />}
            />
            <Route
              exact
              path="/profile"
              element={<Profile contract={contract} account={address} />}
            />
            <Route exact path="/create-nft" element={<CreateNft />} />
          </Routes>
          {/* </div> */}
        </Router>
      </div>
      {openWalletOption ? <ConnectKitButton /> : null}
    </>
  );
}

export default App;
