import React from "react";
import "../homepage/Landingpage.css";
import Heroimage from "./assets/Component.svg";
import Musiclogo from "./assets/music.svg";
import Livepeerlogo from "./assets/Livepeer.svg";
import Polygonelogo from "./assets/polygon.svg";
import nftportlogo from "./assets/nftport.svg";
import Zoralogo from "./assets/zora.svg";
import { Chat } from "@pushprotocol/uiweb";
function Landingpage() {
  return (
    <>
      <div className="homepage-main">
        <div className="background-color background">
          <div className="h-left">
            <img src={Heroimage} className="Heroimage" />
          </div>
          <div className="main-text">
            <div className="hero-text">
              PIXEL <br />
              <span className="game"> PULSE </span>
            </div>
            <div className="tag-line">
              DON'T MISS OUT ON YOUR FAVOURITE SPORT LIVE!
            </div>

            <div className="all-sponsers">
              <div className="flex-grow"></div>
              {/* 
              <img src={Livepeerlogo} className="Livepeerlogo" />
              <img src={Polygonelogo} className="Polygonelogo" />
              <img src={Zoralogo} className="Zoralogo" />
              <img src={nftportlogo} className="nftstoragelogo" /> */}
            </div>
          </div>
        </div>

        <div className="landigpage-footer ">
          Copyright © 2023 PixelPulse. All Rights Reserved
        </div>
      </div>
    </>
  );
}
export default Landingpage;
