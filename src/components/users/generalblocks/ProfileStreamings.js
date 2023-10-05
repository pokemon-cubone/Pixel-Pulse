import { Routes, Link, useNavigate } from "react-router-dom";
import React from "react";
import "../generalblocks/profilestreamings.scss";
import img from "../styles/Gaming4-5.jpg";
import logo from "../styles/man.png";
import { useEffect, useState } from "react";
import CreateNft from "./CreateNft";
import axios from "axios";
import { ethers } from "ethers";
import Nft from "../../../artifacts/contracts/nft.json";

function ProfileStreamings({ account, contract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [name, setName] = useState("Unknown");
  const [no_nft, setNoNft] = useState();
  const [no_stream, setNoStream] = useState();
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [nftData, setNftData] = useState([]);

  const getProfileData = async (e) => {
    const n = await contract.getCreator(account);
    if (n.creatorName) {
      setName(n.creatorName);
    }
    let streams = await contract.getStreamId(account);
    // console.log(streams.lenght);
    for (let i = 0; i < streams.length; i++) {
      let id = parseInt(streams[i]._hex, 16);
      const streamStruct = await contract.getAllStream(id);
      // console.log(streamStruct);
      const t = streamStruct.title;
      const d = streamStruct.description;
      const creator = streamStruct.stream_creator;
      const cid = streamStruct.img_cid;
      const v_id = streamStruct.video_id;
      // console.log("vid" + v_id);

      data.push([t, cid, creator, d, v_id]);
    }
    setData(data);
    setLoading(false);
  };
  console.log(data);

  useEffect(() => {
    getProfileData();
    // setLoading(false);
  }, []);

  if (isLoading) {
    console.log("Loading");
  }
  // ************************************

  const navigate = useNavigate();
  const navigateToCreateNft = (id) => {
    navigate("/create-nft", { state: { id: id } });
  };
  const navigateToStreamPlay = (id) => {
    console.log(id);

    navigate("/stream-play", { state: { id: id } });
  };
  console.log(nftData.nftImage);

  //---------------------------------------NFT Mint -------------------------------//
  const nft_contract_address = "0x0383e8f0790Fc80Ce409B18b5Ff42534abFB3513";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const mintNft = async () => {
    var title = nftData.nftTitle;
    var fileurl = nftData.nftImage;
    var desc = nftData.nftDes;
    var metadataUri;
    const metadata = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/metadata",
      headers: {
        "Content-Type": "application/json",
        Authorization: "4455109c-4819-40f5-9ec5-5882af32a7ed",
      },
      data: {
        name: title,
        description: desc,
        file_url: fileurl,
      },
    };

    await axios
      .request(metadata)
      .then(function (response) {
        console.log(response.data);
        metadataUri = response.data.metadata_uri;
      })
      .catch(function (error) {
        console.error(error);
      });

    console.log(metadataUri);
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    var address = account[0];
    const mintNft = new ethers.Contract(nft_contract_address, Nft, signer);
    const mintNFT = await mintNft.storeNft(
      // "0xeB05322B3C154121AA9114C570e393033074E1E2",
      address,
      metadataUri,
      true
    );
    console.log(mintNFT);
  };

  return (
    <>
      <section className="ps-main-container">
        <section className="ps-grid-container">
          {/* **************************** */}
          {/* ************************************ */}

          {data.map((inde) => {
            return (
              <div className="ps-grid-div">
                <div
                  className="ps-video-image"
                  onClick={() => navigateToStreamPlay(inde[2])}
                >
                  <img
                    src={inde[1]}
                    alt="video_cover"
                    height="100%"
                    width="100%"
                    crossOrigin="anonymous"
                  />
                  <div class="middle">
                    <div class="text">
                      <svg
                        className="ps-video-play-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        height="30px"
                        viewBox="0 0 55.127 61.182"
                      >
                        <g
                          id="Group_38215"
                          data-name="Group 38215"
                          transform="translate(30 35)"
                        >
                          <g
                            id="play-button-arrowhead_1_"
                            data-name="play-button-arrowhead (1)"
                            transform="translate(-30 -35)"
                          >
                            <path
                              id="Path_18"
                              data-name="Path 18"
                              d="M18.095,1.349C12.579-1.815,8.107.777,8.107,7.134v46.91c0,6.363,4.472,8.952,9.988,5.791l41-23.514c5.518-3.165,5.518-8.293,0-11.457Z"
                              transform="translate(-8.107 0)"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="ps-grid-title">
                  <h3 className="ps-title">{inde[0]}</h3>
                </div>
                <div className="ps-user-name">
                  <h6>{name}</h6>
                </div>
                <div className="ps-stream-time">
                  <h6>{inde[3]}</h6>
                </div>
                <div className="ps-grid-title">
                  {/* <Link
                    to="/create-nft"
                    state={{ id: 1, name: "abc", shirt: "green" }}
                  > */}
                  <button
                    onClick={() => {
                      setNftData({
                        nftImage: inde[1],
                        nftTitle: inde[0],
                        nftDes: inde[3],
                      });
                      mintNft();
                    }}
                  >
                    Create NFT
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            );
          })}
          {/* **************************** */}
        </section>
      </section>
    </>
  );
}

export default ProfileStreamings;
