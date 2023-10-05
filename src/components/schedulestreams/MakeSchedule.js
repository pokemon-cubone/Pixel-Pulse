import React from "react";
import "./MakeSchedule.scss";
import { create, CID } from "ipfs-http-client";
import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Upload from "../homepage/assets/Component.svg";
// import Upload from "../styles/man.png";
// import pic from "./music.jpg";
function MakeSchedule({ account, contract }) {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [rights, setRights] = useState("");
  const [price, setPrice] = useState();

  const [yourImage, setImage] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });
  const profile_picture = useRef(null);
  const [profile_image, setProfile_image] = useState();
  const [profile_image_url, setProfile_image_url] = useState();

  const [start_date, setStart_date] = useState();

  function reset(e) {
    setProfile_image(null);
  }
  function startdate(e) {
    setStart_date(e.target.value);
  }
  const [end_date, setEnddate] = useState();
  function enddate(e) {
    setEnddate(e.target.value);
  }
  const [end_time, setEndtime] = useState();
  function endtime(e) {
    setEndtime(e.target.value);
  }
  const [start_time, setStarttime] = useState();
  function starttime(e) {
    setStarttime(e.target.value);
  }
  async function UploadImage(e) {
    const file = e.target.files[0];
    setProfile_image(file);
    try {
      const client = create("https://ipfs.infura.io:5001/api/v0");
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfile_image_url(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const getScheduledDetails = async (e) => {
    // const time1 = start_date + " " + start_time;
    // const time2 = end_date + " " + end_time;
    // const tx = await contract.scheduleStream(
    //   account,
    //   profile_image_url,
    //   title,
    //   des,
    //   time1,
    //   time2,
    //   rights,
    //   price
    // );
    // tx.wait();
    console.log(title);
    console.log(des);
    // console.log(time1);
    // console.log(time2);
    console.log(rights);
    console.log(price);
  };
  return (
    <div className="make-schedule-background">
      <div className="make-schedule-background-inner-div">
        <div class="container">
          <section>
            <div class="column">
              {/* <label for="myfile">Cover Image:</label>
            <input type="file" id="myfile" name="myfile"></input> */}
            </div>
            <div className="fileupload">
              {profile_image ? (
                <>
                  <img
                    src={profile_image_url}
                    className="uploaded_image-editprofile"
                    alt="user_avatar"
                  />
                  <button
                    className="reset-btn"
                    onClick={(e) => {
                      reset(e);
                    }}
                  >
                    reset
                  </button>
                </>
              ) : (
                <div
                  className="upload-profile-picture"
                  onClick={(e) => {
                    profile_picture.current.click();
                  }}
                >
                  <img
                    src={Upload}
                    className="upload-image"
                    alt="user_avatar"
                    placeholder="upload_image"
                  />
                </div>
              )}
              <input
                className="input-edit-profile"
                type="file"
                hidden
                // defaultValue={nameOfUser}
                ref={profile_picture}
                onChange={(e) => {
                  UploadImage(e);
                }}
              />
              <div>
                {yourImage.map((upFile) => {
                  return (
                    <div>
                      <img
                        src="{upFile.preview}"
                        style={{ width: "100px", height: "100px" }}
                        alt="preview"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div class="column">
              {/* <label for="name">Title</label> */}
              <input
                className="ms-input"
                type="text"
                id="name"
                placeholder="Stream Title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div class="column">
              {/* <label for="subject">Discription</label> */}
              <input
                className="ms-input"
                type="text"
                id="subject"
                placeholder="Stream Description"
                onChange={(event) => setDes(event.target.value)}
              />

              <div class="column">
                <div class="column">
                  {/* <label for="name">Input</label> */}
                  <input
                    className="ms-input"
                    type="text"
                    id="start"
                    placeholder="Enter Wallet Address"
                    onChange={(event) => setRights(event.target.value)}
                  />
                </div>
                {/* <label for="contact">Price</label> */}
                <input
                  className="ms-input"
                  type="number"
                  id="start"
                  placeholder="Price here"
                  onChange={(event) => setPrice(event.target.value)}
                />
                <div className="date-time">
                  <div>
                    <label for="start" className="start">
                      Start date:
                    </label>
                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      min="2022-08-07"
                      max="2022-12-31"
                      onChange={(e) => {
                        startdate(e);
                      }}
                    />
                  </div>
                  <div>
                    <label for="appt" className="start">
                      Select time:
                    </label>
                    <input
                      type="time"
                      id="start"
                      name="appt"
                      onChange={(e) => {
                        starttime(e);
                      }}
                    />
                  </div>
                </div>
                <div className="date-time">
                  <div>
                    <label for="start" className="start">
                      End date:
                    </label>
                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      min="2022-08-07"
                      max="2022-12-31"
                      onChange={(e) => {
                        enddate(e);
                      }}
                    />
                  </div>
                  <div>
                    <label for="appt" className="start">
                      Select time:
                    </label>
                    <input
                      type="time"
                      id="start"
                      name="appt"
                      onChange={(e) => {
                        endtime(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="action-button"
              onClick={(e) => getScheduledDetails()}
            >
              Submit
            </button>
          </section>
        </div>
      </div>
      <div className="landigpage-footer ">
        Copyright © 2023 PixelPulse. All Rights Reserved
      </div>
    </div>
  );
}

export default MakeSchedule;
