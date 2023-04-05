// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };




  const detect = async (net) => {
    

    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;


     


      // Make Detections
      const obj = await net.detect(video);
      // console.log(obj)
      function myFunction(value, index, array) {
        // // console.log(value)
        // // console.log(value.class)
        // if(value.class=='person'){
        //   setTimeout(() => {
        //    console.log('person')
        // }, 10000);
        // }
       if(value.class =='bird' || value.class=='skateboard' || value.class=='cat' || value.class =='bear' || value.class=='cow' || value.class=='teddy bear' || value.class=='donut' || value.class=='umbrella' || value.class=='handbag'){
       
        // fetch(' https://blr1.blynk.cloud/external/api/update?token=M1RZsnfI1b813dCtZWQetQsiT9pCM-33&v0=1');
        fetch('https://blr1.blynk.cloud/external/api/update?token=M1RZsnfI1b813dCtZWQetQsiT9pCM-33&v0=1')
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            // setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
       }
      }
      obj.forEach(myFunction);
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      // console.log(ctx)
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
      
    </div>
  );
}

export default App;
