import React, { useEffect } from "react";
import img from "../styles/Gaming4-5.jpg";
import { ethers } from "ethers";
// import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { useState } from "react";
import axios from "axios";
import nft from "../../../artifacts/contracts/nft.json";
import Moralis from "moralis";
// import { EvmChain } from "@moralisweb3/evm-utils";

function ProfileNfts() {
  let [error, setErr] = useState(null);
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);
  const [nftData, setNftData] = useState([]);
  const nft_contract_address = "0x0383e8f0790Fc80Ce409B18b5Ff42534abFB3513";

  const fetchCertificate = async (e) => {
    setLoading(true);
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    var address = account[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const mintNft = new ethers.Contract(nft_contract_address, nft, signer);
    const nftsdata = await mintNft.getTokenIds(
      // "0xF50699109cA8AdB470dC8430Dbc36Cd7622D022f"
      address,
    );
    console.log(nftsdata);
    setNftData(nftsdata);
    var metadataUri = [];
    for (let i = 0; i < nftsdata.length; i++) {
      await axios
        .request("https://ipfs.io/ipfs/" + nftsdata[i][1].substring(7))
        .then(function (response) {
          metadataUri.push(response.data);
          console.log(response.data);
          //  metadataUri.push(_response.data.metadata_uri;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    console.log(metadataUri);
    setNftData(metadataUri);
    // setCertificateData(certificates);
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificate();
  }, []);

  return (
    <>
      <section className="ps-main-container">
        <section className="ps-grid-container">
          {nftData.length > 0
            ? nftData.map((item) => {
                return (
                  <>
                    <div className="ps-grid-div">
                      <div className="ps-video-image">
                        <img
                          src={item.image}
                          alt="video_cover"
                          height="100%"
                          width="100%"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <div className="ps-grid-title">
                        <h3 className="ps-title">{item.description}</h3>
                      </div>
                      <div className="ps-nft-div">
                        <div className="ps-nft-div-inside-one">
                          <div className="ps-user-name">
                            <p>{item.name}</p>
                          </div>
                          <div className="ps-stream-time"></div>
                        </div>
                        <div className="ps-nfts-buy-btn"></div>
                      </div>
                    </div>
                  </>
                );
              })
            : null}

          {/* **************************** */}
          {/* ********************************* */}

          {/* **************************** */}
          {/* ********************************* */}

          {/* **************************** */}
        </section>
      </section>
    </>
  );
}

export default ProfileNfts;
