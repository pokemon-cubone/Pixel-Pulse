import React, { useState } from "react";
import logo from "../users/styles/man.png";
import ProfileCreateNft from "./generalblocks/ProfileCreateNft";
import ProfileNfts from "./generalblocks/ProfileNfts";
import ProfileStreamings from "./generalblocks/ProfileStreamings";
import "./styles/profile.scss";
import EditProfile from "./generalblocks/EditProfile";
import "../users/styles/popup.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Profile({ account, contract }) {
  const [imgSrc, setImgSrc] = useState(logo);
  const [showStreamings, setStreamings] = useState(true);
  const [showNFTs, setNFTs] = useState(false);
  // const [showCreateNFTs, setCreateNFTs] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [name, setName] = useState("");
  const [no_nft, setNoNft] = useState();
  const [no_stream, setNoStream] = useState();

  const getProfileData = async (e) => {
    const n = await contract.getCreator(account);
    if (n.creatorName) {
      setName(n.creatorName);
    }
    setImgSrc(n.photo_cid);
    console.log(n.photo_cid);
    setNoNft(n.tokens.length);
    let number_stream = await contract.getTotal(account);
    number_stream = parseInt(number_stream._hex, 16);
    setNoStream(number_stream);
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
    // setLoading(false);
  }, [contract]);

  if (isLoading) {
    console.log("Loading");
  }

  return (
    <>
      {buttonPopup && (
        <EditProfile
          account={account}
          contract={contract}
          closeModal={setButtonPopup}
        />
      )}
      <section className="profile-main-container">
        <div className="profile-main-container-inner-div">
          <section className="profile-first-section">
            <div className="profile-first-section-inside-one">
              <div className="profile-image">
                <img
                  id="profile-image-id"
                  src={imgSrc}
                  alt="user-profile"
                  width="128px"
                  height="128px"
                  crossOrigin="anonymous"
                ></img>
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  <h1>{name}</h1>
                </div>

                <div className="profile-nft-info">
                  <p>
                    Total 1<span className="nft-span">{no_nft}</span>
                  </p>
                  <p>
                    Total 2<span className="nft-span">{no_stream}</span>
                  </p>
                </div>
                <div className="profile-info-button">
                  <Link to={"/make-schedule"}>
                    <button className="profile-btn">Schedule Event</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="profile-edit-btn">
              <button
                className="profile-edit-button"
                onClick={() => {
                  setButtonPopup(true);
                }}
              >
                Edit Profile
              </button>
            </div>
          </section>
          <section className="profile-second-section">
            <div className="profile-button-grp">
              <button
                onClick={() => {
                  setStreamings(false);
                  setNFTs(true);
                  // setCreateNFTs(false);
                }}
                className={
                  showNFTs
                    ? `profile-second-btns active`
                    : `profile-second-btns`
                }
              >
                NFTs
              </button>
              <button
                onClick={() => {
                  setStreamings(true);
                  setNFTs(false);
                  // setCreateNFTs(false);
                }}
                className={
                  showStreamings
                    ? `profile-second-btns active`
                    : `profile-second-btns`
                }
              >
                Streamings
              </button>

              {/* <button
                onClick={() => {
                  setStreamings(false);
                  setNFTs(false);
                  setCreateNFTs(true);
                }}
                className={
                  showCreateNFTs
                    ? `profile-second-btns active`
                    : `profile-second-btns`
                }
              >
                Create NFT
              </button> */}
            </div>
            {showStreamings ? (
              <ProfileStreamings contract={contract} account={account} />
            ) : null}
            {showNFTs ? (
              <ProfileNfts contract={contract} account={account} />
            ) : null}
            {/* {showCreateNFTs ? (
              <ProfileCreateNft contract={contract} account={account} />
            ) : null} */}
          </section>
        </div>
        <div className="landigpage-footer ">
          Copyright © 2023 PixelPulse. All Rights Reserved
        </div>
      </section>
    </>
  );
}

export default Profile;
