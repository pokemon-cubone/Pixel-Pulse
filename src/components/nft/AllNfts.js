import React from "react";
import "../nft/AllNfts.scss";
import img from "../nft/man.png";
import ReactPlayer from "react-player/lazy";
// import video from "../nft/video.mp4";
import Allnft from "../nft/Allnft.json";

function AllNfts() {
  return (
    <>
      <div className="nft-main-container">
        <div className="nft-main-container-inner-div">
          <div className="nft-header">
            <h1 className="t-header">NFTs</h1>
            {/* <p className="p-header">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              temporibus sed voluptatem dicta quas vitae quibusdam omnis
              similique optio sint esse quisquam
            </p> */}
          </div>
          <div className="nft-main-content">
            {Allnft.map((inde) => {
              return (
                <div className="nft-content">
                  <div className="nft-video">
                    <video
                      width="320"
                      height="240"
                      src={inde.videoUrl}
                      crossOrigin="anonymous"
                      controls={true}
                      border-radius="20px"
                    >
                      <source src={inde.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* <ReactPlayer
                      playing
                      url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      style={{ width: "fit-content !important" }}
                      controls={true}
                    /> */}
                    <div className="nft-user">
                      <div className="nft-img-name">
                        <img src={img} alt="" />
                        <span>{inde.user}</span>
                      </div>
                      <button type="submit" className="nft-btn" alt="Buy Now">
                        Buy NFT
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="landigpage-footer ">
          Copyright © 2023 PixelPulse. All Rights Reserved
        </div>
      </div>
    </>
  );
}

export default AllNfts;
