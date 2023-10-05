import React from "react";
import "../stream/LiveSports.scss";
import Livepeer from "livepeer-nodejs";
import ReactPlayer from "react-player";
import { useReactMediaRecorder } from "react-media-recorder";
import { useState, useEffect } from "react";
import LoadingAnimation from "../users/generalblocks/LoadingAnimation";

function LiveSports() {
  const [videoSrc, setVideoSrc] = useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [stream, setStreams] = useState("");

  useReactMediaRecorder({ video: true });
  const livepeerObject = new Livepeer("77aa98f3-4889-4091-94f7-22eee8b5a79f");

  const getStreams = async () => {
    const streams = await livepeerObject.Stream.getAll(1, true, true);
    setStreams(streams);
    setLoading(false);
  };

  useEffect(() => {
    getStreams();
    // setLoading(false);
  }, 5000);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (stream) {
    return (
      <>
        <div className="livestream-main-container">
          <div className="livestream-header">
            <div className="livestream-t-header">LiveStream</div>
            <p className="livestream-p-header">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              temporibus sed voluptatem dicta quas vitae quibusdam omnis
              similique optio sint esse quisquam
            </p>
          </div>
          {stream.map((stream) => {
            return (
              <div className="livestream-main-content">
                <div className="livestream-content">
                  <div className="livestream-img">
                    <a>
                      {/* <img src="https://picsum.photos/200" alt="" /> */}
                      <ReactPlayer
                        url={
                          "https://livepeercdn.com/hls/" +
                          stream.playbackId +
                          "/index.m3u8"
                        }
                        controls="true"
                      />
                    </a>
                    <div class="btn btn_live">
                      Live<span class="live-icon"></span>
                    </div>
                  </div>

                  <div className="livestream-title">
                    <h4>The news you asking thought, king’s</h4>
                  </div>
                  <div className="livestream-user">
                    <div className="livestream-img-name">
                      <span>user name</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="landigpage-footer ">
          Copyright © 2023 PixelPulse. All Rights Reserved
        </div>
      </>
    );
    //   } else {
    //     console.log("no");
    //   }
    // }
  }
}
export default LiveSports;
