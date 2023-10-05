import React, { useRef, useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import ReactPlayer from 'react-player'




const CreateN = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [dimensions, setDimensions] = useState({});

  let context;
  if (canvasRef.current) {
    context = canvasRef.current.getContext('2d');
  }

  function getVideoSizeData(videoRef) {
    const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;
    const w = videoRef.current.videoWidth - 100;
    const h = parseInt(w / ratio, 10);
    return {
      ratio,
      w,
      h
    };
  }

  useEffect(() => {
    // Add listener when the video is actually available for
    // the browser to be able to check the dimensions of the video.
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', function() {
        const { w, h } = getVideoSizeData(videoRef);

        canvasRef.current.width = w;
        canvasRef.current.height = h;
        setDimensions({
          w: w,
          h: h
        });
      });
    }
  }, []);
  

  const snap = () => {
     if (context && videoRef.current) {
      context.fillRect(0, 0, dimensions.w, dimensions.h);
      context.drawImage(videoRef.current, 0, 0, dimensions.w, dimensions.h);
    }
  
  }
  

 


  return (
    <div>
      {/* <video
        src="https://livepeercdn.studio/recordings/a99dea4b-fa78-432b-a6f3-eda1a8a601e8/index.m3u8"
        crossOrigin='anonymous'
        ref={videoRef}
        controls
      /> */}
      
        <ReactHlsPlayer
    src="https://livepeercdn.studio/recordings/e146d72f-b1ed-4a2f-b8bb-08431ed9eeeb/index.m3u8"
    autoPlay={false}
    controls={true}
    ref={videoRef}
    width="100%"
    height="auto"
  />
      <canvas crossOrigin="anonymous" ref={canvasRef} />
      <button onClick={snap}>Take screenshot</button>
    </div>
  )
}

export default CreateN