import React from "react";
import "./ScheduledStreams.scss";
import { useEffect, useState } from "react";
import Stream from "../schedulestreams/Schedulestream.json";

function ScheduledStreams({ account, contract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);

  // const getScheduledData = async (e) => {
  //   let number = await contract.getTotalScheduledNumber();
  //   number = parseInt(number._hex, 16);
  //   for (let i = 1; i <= number; i++) {
  //     const stream = await contract.getAllScheduledStreams(i);
  //     const cover = stream.cover_cid;
  //     const title = stream.s_title;
  //     const des = stream.s_description;
  //     const time1 = stream.starttime;
  //     const time2 = stream.endtime;
  //     data.push([cover, title, des, time1, time2]);
  //   }
  //   setData(data);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getScheduledData();
  //   // setLoading(false);
  // }, [contract]);

  if (isLoading) {
    console.log("Loading");
  }
  return (
    <div className="main">
      <div className="main-inner-div">
        <div className="stream-title">
          <h1 className="ss-title">Scheduled Streams</h1>
        </div>
        {Stream.map((inde) => {
          return (
            <div className="card-container">
              <div className="main-card">
                <div className="stream-image">
                  <img
                    src={inde.img}
                    alt=""
                    className="cover-img"
                    crossOrigin="anonymous"
                    value="35GB"
                  />
                </div>
                <div className="card-title">
                  <h1>{inde.title}</h1>
                  <span className="card-description">{inde.dec}</span>
                  <div className="date-time-sc">
                    <p>Start Time : {inde.stime}</p>
                  </div>
                </div>
                <button className="book-button">BOOK NOW</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="landigpage-footer ">
        Copyright © 2023 PixelPulse. All Rights Reserved
      </div>
    </div>
  );
}

export default ScheduledStreams;
