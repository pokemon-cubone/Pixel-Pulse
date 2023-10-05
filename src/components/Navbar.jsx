import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import "../styles/Navbar/navbar.scss";
import Dropdown from "./users/generalblocks/Dropdown";
import logo from "../components/homepage/assets/pixelpulse.gif";
import "../styles/Navbar/navbar.scss";
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { useAccount } from "wagmi";

import styled from "styled-components";
// import {navbarItem} from "./users/NavbarItem"

const Navbar = ({ setOpenWalletOption }) => {
  const [showEnsName, setEnsName] = useState();
  const cookie = new Cookies();
  const { address, isConnected } = useAccount();
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);

  const onMouseEnter = () => {
    if (window.innerWidth < 200) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  // console.log(connector);

  const onMouseLeave = () => {
    if (window.innerWidth < 200) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  useEffect(() => {
    const addr = cookie.get("account");
    if (addr) {
      isConnected(addr);
    }
  }, [cookie]);

  useEffect(() => {
    if (address) setOpenWalletOption(false);
  }, [isConnected]);

  return (
    <>
      <div className="navbar-main">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={logo} alt="logo" height="50px"></img>
          </div>
        </div>
        {/* <div className="navbar-middle">
          <div className="searchbar">
            <input type="text" />
          </div>
        </div> */}

        {isConnected ? (
          <div className="navbar-right">
            <ul>
              <li
                className={window.location.pathname === "/" ? "active" : null}
              >
                <Link to="/">Home</Link>
              </li>
              <div className="dropdown-content"></div>
              <li
                className={
                  window.location.pathname === "/streams" ? "active" : null
                }
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <Link to="/streams">Streams</Link>
                {dropdown && <Dropdown />}
              </li>
              <li
                className={
                  window.location.pathname === "/all-artists" ? "active" : null
                }
              >
                <Link to="/all-artists">All Artists</Link>
              </li>
              <li
                className={
                  window.location.pathname === "/all-nfts" ? "active" : null
                }
              >
                <Link to="/all-nfts">All NFTs</Link>
              </li>
              <li
                className={
                  window.location.pathname === "/make-schedule"
                    ? "active"
                    : null
                }
              >
                <Link to="/make-schedule">Make Schedule</Link>
              </li>
              <li
                className={
                  window.location.pathname === "/profile" ? "active" : null
                }
              >
                <Link to="/profile">Profile</Link>
              </li>
              <ConnectKitButton />
            </ul>
          </div>
        ) : (
          <div className="navbar-right">
            <ul>
              <li
                className={window.location.pathname === "/" ? "active" : null}
              >
                <Link to="/">Home</Link>
              </li>
              <li>
                <ConnectKitButton />
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
