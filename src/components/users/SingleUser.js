import React, { useState } from "react";
import logo from "../users/styles/man.png";
import ProfileCreateNft from "./generalblocks/ProfileCreateNft";
import ProfileNfts from "./generalblocks/ProfileNfts";
import ProfileStreamings from "./generalblocks/ProfileStreamings";

function SingleUser() {
  const [imgSrc, setImgSrc] = useState(logo);
  const [showStreamings, setStreamings] = useState(true);
  const [showNFTs, setNFTs] = useState(false);
  const [showCreateNFTs, setCreateNFTs] = useState(false);

  return (
    <>
      <section className="profile-main-container">
        <section className="profile-first-section">
          <div className="profile-first-section-inside-one">
            <div className="profile-image">
              <img
                id="profile-image-id"
                src={imgSrc}
                alt="user-profile"
                width="128px"
                height="128px"
              ></img>
            </div>
            <div className="profile-info">
              <div className="profile-name">
                <h1>User Name</h1>
              </div>
              {/* <div className="profile-details">
              <p className="profile-details-p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur est vero fugit, nisi aliquam obcaecati pariatur
                delectus dolorem vitae, unde reiciendis praesentium. Optio
                tempora fugit, sapiente eum suscipit error obcaecati aperiam,
                alias, doloribus fuga harum ipsam consequatur eaque magnam
                dignissimos quam! Porro quia cumque explicabo molestias
                repudiandae sit optio labore itaque laborum dignissimos rerum
                odio numquam nulla unde fugiat, dolores accusantium assumenda
                laudantium molestiae ea praesentium! Non rerum eius excepturi
                est illo neque iusto voluptate. Architecto magnam similique
                blanditiis voluptatum aspernatur, alias labore dolore deleniti,
                impedit at dolores ducimus ea sit debitis, numquam dignissimos
                doloremque. Deserunt omnis temporibus iusto error.
              </p>
             </div> */}
              <div className="profile-nft-info">
                <p>
                  Total <span className="nft-span">NFTs</span>
                </p>
                <p>
                  Total <span className="nft-span">Streams</span>
                </p>
              </div>
              {/* <div className="profile-info-button">
                <button className="profile-btn">Schedule Event</button>
              </div> */}
            </div>
          </div>
          {/* <div className="profile-edit-btn">
            <button className="profile-edit-button">Edit Profile</button>
          </div> */}
        </section>
        <section className="profile-second-section">
          <div className="profile-button-grp">
            <button
              onClick={() => {
                setStreamings(true);
                setNFTs(false);
                setCreateNFTs(false);
              }}
              className={
                showStreamings
                  ? `profile-second-btns active`
                  : `profile-second-btns`
              }
            >
              Streamings
            </button>
            <button
              onClick={() => {
                setStreamings(false);
                setNFTs(true);
                setCreateNFTs(false);
              }}
              className={
                showNFTs ? `profile-second-btns active` : `profile-second-btns`
              }
            >
              NFTs
            </button>
            <button
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
            </button>
          </div>
          {showStreamings ? <ProfileStreamings /> : null}
          {showNFTs ? <ProfileNfts /> : null}
          {showCreateNFTs ? <ProfileCreateNft /> : null}
        </section>
      </section>
    </>
  );
}

export default SingleUser;
