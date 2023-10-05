import React from "react";
import "./profilecreatenft.scss";
import { useLocation } from "react-router-dom";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import "../generalblocks/createnft.scss";
import { create, CID } from "ipfs-http-client";
import { NFTStorage, File, Blob } from "nft.storage";
import { MediaFactory } from "@zoralabs/core/dist/typechain/MediaFactory";
import { ethers } from "ethers";
import onebeat from "./catchMyGame.json";
import Decimal from "@zoralabs/core/dist/utils/Decimal";
import CreateN from '../CreateN'

import {
  arrayify,
  formatBytes32String,
  formatUnits,
  sha256,
} from "ethers/lib/utils";

const contractAddress = "0x7242137346A89b53477D880c8cFa03d3CbCDe805";

const ffmpeg = createFFmpeg({ log: true });

class CreateNft extends React.Component {
  // const [isLoading, setLoading] = React.useState(true);
  // const [src, setSrc] = React.useState("");

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      ready: false,
      video:
        "https://livepeercdn.com/recordings/66733d00-43ae-41ac-b256-6e94d9d2d7d5/source.mp4",
      gif: null,
      start: 0,
      length: 3,
      isLoading: true,
      src: "",
      blob: "",
      location: this.props.location,
    };
  }
  componentDidMount() {
    this.loadFFmpeg();
    // this.setState({ video: "https://setup.com" });
  }

  async loadFFmpeg() {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    this.setState({ isLoading: true });
  }

  async convertVideoToGif() {
    //write video to memory
    ffmpeg.FS("writeFile", "vid.mp4", await fetchFile(this.state.video));

    //run ffmpeg command
    await ffmpeg.run(
      "-i",
      "vid.mp4",
      "-s",
      "480x320",
      "-r",
      "3",
      "-t",
      String(this.state.length),
      "-ss",
      String(this.state.start),
      "-vf",
      "scale=1920:1080",
      "out.mp4",
      "des",
      "name"
    );

    //convert to data to url
    const data = ffmpeg.FS("readFile", "out.mp4");
    this.setState({ blob: new Blob([data.buffer], { type: "video/mp4" }) });
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    this.setState({ gif: url });
  }

  async mint() {
    const client = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVjM0MxREExNjEwYTlFNzg5NzYxYzI1NThEOUI5ZjkzRjA4NzBGRDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTc5NzU0OTEzMywibmFtZSI6Im1ldGFib2xpc20ifQ.FkUZG-1NURVn0_OK_2-6YEgfqLBtC8DqdisjNXjyd0o",
    });
    const cid = await client.storeBlob(this.state.blob);
    console.log(cid);
    const metadata = {
      title: this.state.name,
      description: this.state.des,
      tokenURI: cid,
    };
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const c = new ethers.Contract(contractAddress, onebeat.abi, signer);

    const ipfs_client = create("https://ipfs.infura.io:5001/api/v0");
    const added = await ipfs_client.add(metadata);
    console.log(added);
    const media = MediaFactory.connect(contractAddress, signer);
    const metadataHex = ethers.utils.formatBytes32String(
      JSON.stringify(metadata)
    );
    const metadataHash = await sha256(metadataHex);
    const metadataHashBytes = ethers.utils.arrayify(metadataHash);
    const tx = await media.mint(
      {
        tokenURI: "https://" + cid + ".ipfs.dweb.link/",
        metadataURI: "https://ipfs.io/ipfs/" + added,
        contentHash: Uint8Array.from(Buffer.from(metadataHashBytes, "hex")),
        metadataHash: Uint8Array.from(Buffer.from(metadataHashBytes, "hex")),
      },
      {
        prevOwner: Decimal.new(0),
        creator: Decimal.new(5),
        owner: Decimal.new(95),
      }
    );
    tx.wait();
    console.log(`New piece is minted ☼☽`);
    media.on("Transfer", (from, to, tokenId) => {
      console.log(tokenId);
    });
  }

  //  var location = useLocation();
  render() {
    return this.state.isLoading ? (
      <>
        <div className="cn-main-container">
          <div className="cn-left-container">
            <h1>Your Stream</h1>
            {this.state.video && (
              <video
                controls
                width={500}
                src={this.state.video}
                crossOrigin="anonymous"
              />
            )}
            {/* <input
          type={"file"}
          onChange={(e) => {
            this.setState({ video: e.target.files?.item(0) });
          }}
        /> */}
            <div className="cn-left-label">
              <div>
                <label htmlFor={"start-input"}>
                  NFT Video Starting Time (in Sec){" "}
                </label>
              </div>
              <div>
                <input
                  id={"start-input"}
                  type={"number"}
                  value={this.state.start}
                  onChange={(e) => {
                    this.setState({ start: e.target.value });
                  }}
                />
              </div>
              <div>
                <CreateN/>
              </div>
              <div>
                <label htmlFor={"length-input"}>
                  Length of the Video (in Sec){" "}
                </label>
              </div>
              <div>
                <input
                  id={"length-input"}
                  type={"number"}
                  value={this.state.length}
                  onChange={(e) => {
                    this.setState({ length: e.target.value });
                  }}
                />
              </div>
            </div>
            <button
              className="cn-convert-button"
              onClick={() => {
                this.convertVideoToGif();
              }}
            >
              Create NFT
            </button>
          </div>
          <div className="cn-right-container">
            <h1>Your NFT Preview</h1>

            {this.state.gif && (
              <>
                <video controls width={500} src={this.state.gif} alt={"gif"} />

                <div className="cn-left-label">
                  <div>
                    <label>Enter Title of the NFT</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={(event) =>
                        this.setState({ name: event.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label>NFT Description </label>
                  </div>
                  <div>
                    <textarea
                      rows="7"
                      cols="30"
                      onChange={(event) =>
                        this.setState({ des: event.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  className="cn-convert-button"
                  onClick={() => {
                    this.mint();
                  }}
                >
                  Mint NFT
                </button>
              </>
            )}
          </div>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default CreateNft;
