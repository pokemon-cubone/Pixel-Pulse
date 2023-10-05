import React from "react";
import { useEffect, useRef, useState } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import Livepeer from "livepeer-nodejs";
import { create, CID } from "ipfs-http-client";
import "./createstream.scss";
import { useAccount } from "wagmi";

import cover from "../users/styles/Gaming4-5.jpg";
import { Web3Storage } from "web3.storage";
import { Link } from "react-router-dom";
// const user_address = "0xb14bd4448Db2fe9b4DBb1D7b8097D28cA57A8DE9";

function CreateStream({ account, contract }) {
  const videoEl = useRef(null);
  const stream = useRef(null);
  const mounted = useRef(false);
  const [session, setSession] = useState("");
  const [url, setUrl] = useState("");
  const livepeerObject = new Livepeer("77aa98f3-4889-4091-94f7-22eee8b5a79f");
  const client = create("https://ipfs.infura.io:5001/api/v0");
  const getStreams = async () => {
    const streams = await livepeerObject.Stream.getAll({ isActive: false });
    console.log(streams);
  };

  //
  const { address } = useAccount();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [add, setAdd] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [record, setRecord] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [heroImage, setHeroImage] = useState();
  const [showUploaded_image, setUploadedImage] = useState();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  async function UploadImage(e) {
    const file = await e.target.files[0];
    console.log(file);
    setHeroImage(file);
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRDOGI5MDZiNUIyMjJFM2Y4MTUzRTI1OEE3OEFGNzZCQkU2NDdGYzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg5NDE4NzgzNzgsIm5hbWUiOiJBbGxUaGF0RGF0YSJ9.sk1dShkPApqlSWYsNiZiY1sWUh1SDr8uRaMdc1npDNg",
    });
    const fileInput = document.querySelector('input[type="file"]');
    console.log(fileInput);
    const rootCid = await client.put(fileInput.files, {
      name: "cat pics",
      maxRetries: 3,
    });
    const res = await client.get(rootCid); // Web3Response
    const files = await res.files(heroImage); // Web3File[]
    let f = "";
    for (const file of files) {
      f = file.cid;
    }
    const url = `https://` + `${f}` + `.ipfs.w3s.link`;

    setUploadedImage(url);
    console.log(url);
    // console.log(showUploaded_image);
    // setHeroImage(url);
    // console.log(url);
  }

  const onButtonClick = async () => {
    videoEl.current.volume = 0;

    stream.current = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
      screen: true,
    });
    videoEl.current.srcObject = stream.current;
    videoEl.current.play();

    console.log(stream.current);

    // console.log(stream.current.active);
    const stream_ = await livepeerObject.Stream.create({
      name: "test_stream",
      profiles: [
        {
          name: "720p",
          bitrate: 2000000,
          fps: 30,
          width: 1280,
          height: 720,
        },
        {
          name: "480p",
          bitrate: 1000000,
          fps: 30,
          width: 854,
          height: 480,
        },
        {
          name: "360p",
          bitrate: 500000,
          fps: 30,
          width: 640,
          height: 360,
        },
      ],
    });
    console.log(stream_);
    console.log(stream_.streamKey);
    console.log(stream_);
    console.log(stream_.streamKey);
    const tx = await contract.createStream(
      address,
      title,
      des,
      add,
      showUploaded_image,
      stream_.id,
      record
    );
    tx.wait();
    console.log(title);
    console.log(des);
    console.log(add);
    console.log(record);
    console.log(stream_.id);
    stream_.setRecord(true);
    const current_stream = await livepeerObject.Stream.get(stream_.id);
    console.log("video id" + stream_.id);
    const result = await current_stream.setRecord(true);
    console.log(result);
    const url =
      "https://livepeercdn.com/hls/" + stream_.playbackId + "index.m3u8";
    setUrl(url);
    const streamKey = stream_.streamKey;

    // if (!stream.current) {
    //   alert("Video stream was not started.");
    // }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });

    // console.log(title);
    // console.log(des);
    // console.log(add);
    // console.log(record);
  };

  const closeStream = async () => {
    window.location.reload();
    // session.close();
  };

  useEffect(() => {
    if (!mounted) {
      closeStream();
    }
  }, [mounted]);
  const hero_Image = useRef(null);

  return (
    <>
      <section className="cs">
        <div className="cs-main-container">
          <div className="create-stream-header">
            <h1 className="createstream-t-header">Create Stream</h1>
          </div>

          <div className="cs-inner-div">
            <div className="cs-left-container">
              <video
                className="cs-video"
                ref={videoEl}
                controls
                height="500px"
                width="500px"
              />
              <div className="cs-btns">
                {title.length > 0 &&
                des.length > 0 &&
                add.length > 0 &&
                heroImage ? (
                  <>
                    <button
                      className="cs-button"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      onClick={onButtonClick}
                    >
                      Start
                    </button>

                    <Link to={"/create-nft"}>
                      <button className="cs-button" onClick={closeStream}>
                        Stop
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      disabled
                      className="cs-button"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      onClick={onButtonClick}
                    >
                      Start
                    </button>

                    <Link to={"/create-nft"}>
                      <button
                        disabled
                        className="cs-button"
                        onClick={closeStream}
                      >
                        Stop
                      </button>
                    </Link>
                  </>
                )}
                {isHovering && (
                  <div className="texttag">
                    Create your live stream by clicking start button
                  </div>
                )}
              </div>
            </div>
            <div className="cs-right-container">
              <form>
                <formfield className="cs-formfield">
                  <input
                    className="cs-input"
                    type="text"
                    placeholder="Stream Title"
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </formfield>
                <formfield className="cs-formfield">
                  <textarea
                    className="cs-textarea"
                    type="text"
                    placeholder="Stream Description"
                    rows="6"
                    cols="50"
                    onChange={(event) => setDes(event.target.value)}
                  />
                </formfield>
                <formfield className="cs-formfield">
                  <input
                    className="cs-input"
                    type="text"
                    placeholder="Enter Wallet Address"
                    onChange={(event) => setAdd(event.target.value)}
                    required
                  />
                </formfield>

                <formfield className="cs-formfield">
                  <div className="cs-label">
                    {" "}
                    <p>Choose cover image for stream</p>
                    {showUploaded_image ? (
                      <>
                        <img
                          crossorigin="anonymous"
                          className="cs-uploaded-image"
                          src={showUploaded_image}
                          alt="uploaded image"
                        />
                      </>
                    ) : (
                      <div
                        className="space-to-upload-image"
                        onClick={(e) => {
                          hero_Image.current.click();
                        }}
                      >
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1000 1000"
                          enable-background="new 0 0 1000 1000"
                        >
                          <metadata>
                            {" "}
                            Svg Vector Icons :
                            http://www.onlinewebfonts.com/icon{" "}
                          </metadata>
                          <g>
                            <path d="M850,974.5H150c-77.3,0-140-65.3-140-145.9V646.3c0-20.1,15.7-36.5,35-36.5h70c19.3,0,35,16.3,35,36.5v109.4c0,40.3,31.3,72.9,70,72.9h560c38.7,0,70-32.7,70-72.9V646.3c0-20.1,15.7-36.5,35-36.5h70c19.3,0,35,16.3,35,36.5v182.3C990,909.2,927.3,974.5,850,974.5L850,974.5z M784.5,449.2c-14.2,14.8-37.1,14.8-51.3,0L570,279.1v367.2c0,20.1-15.7,36.5-35,36.5h-70c-19.3,0-35-16.3-35-36.5V279.1L266.8,449.2c-14.2,14.8-37.1,14.8-51.3,0l-51.3-53.4c-14.2-14.8-14.2-38.7,0-53.4L453.2,41.1c1.2-1.3,23.7-15.6,46.4-15.6c22.9,0,45.9,14.3,47.2,15.6l289.1,301.2c14.2,14.8,14.2,38.7,0,53.4L784.5,449.2L784.5,449.2z" />
                          </g>
                        </svg>
                      </div>
                    )}
                    <input
                      className="cs-input"
                      type="file"
                      id="my-file"
                      name="hero-image"
                      hidden
                      ref={hero_Image}
                      onChange={(e) => {
                        UploadImage(e);
                      }}
                      required
                    />
                  </div>
                </formfield>
                <formfield className="cs-formfield">
                  <label id="stream-lebel">
                    Do you want to save this Stream?
                  </label>
                  <label>
                    <input
                      className="cs-input-radio"
                      type="radio"
                      name="radiobutton"
                      value="true"
                      id="color"
                      onChange={(event) => setRecord(event.target.value)}
                      checked
                    ></input>
                    Yes
                  </label>
                  <label>
                    <input
                      className="cs-input-radio"
                      type="radio"
                      name="radiobutton"
                      value="false"
                      id="color"
                      onChange={(event) => setRecord(event.target.value)}
                    ></input>
                    No
                  </label>
                </formfield>
              </form>
            </div>
          </div>
        </div>
        <div className="landigpage-footer ">
          Copyright © 2023 PixelPulse. All Rights Reserved
        </div>
      </section>
    </>
  );
}

export default CreateStream;
