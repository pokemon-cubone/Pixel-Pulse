import React, { useEffect } from "react";
import "./streamplay.scss";
import { useLocation } from "react-router-dom";
import Livepeer from "livepeer-nodejs";
import ReactPlayer from "react-player";

function StreamPlay() {
  const [isLoading, setLoading] = React.useState(true);
  const [src, setSrc] = React.useState("");
  const location = useLocation();

  const streamPlay = async (e) => {
    const livepeerObject = new Livepeer("d72d5808-9b46-4bdf-9cb6-d703ca3e0acc");
    const stream = await livepeerObject.Stream.get(location.state.id);
    const sessions = await stream.getSessions(true);

    console.log(sessions);
    setLoading(false);
    setSrc(
      "https://livepeercdn.com/recordings/" + sessions[0].id + "/index.m3u8"
    );
  };

  useEffect(() => {
    streamPlay();
  }, []);

  if (src) {
    return (
      <>
        <section className="sp-main-container">
          <div className="sp-video-div">
            {/* <h1 className="sp-title-stream">Stream Title</h1> */}
            {/* <h4 className="sp-user-name">user name</h4> */}
            <ReactPlayer url={src} controls="true" />
          </div>
        </section>
      </>
    );
  } else {
    return "Loading ....";
  }
}
export default StreamPlay;
