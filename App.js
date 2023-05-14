import React from "react";
import logo from "./logo.svg";
import "./App.css";


import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

console.log("in javascript fiel");



function App() {

  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/uploadImg")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);



  // const WebcamCapture = () => {


  // };
  const webcamRef = React.useRef();
  const [imgSrc, setImgSrc] = React.useState(null);
  var imageSrc = ""
  const capture = React.useCallback(() => {
    imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);



  return (
    <div className="App">
      <header className="App-header">


        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />

        <button onClick={capture} type="submit" >Capture photo step 1</button>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}

        <form action="/uploadImg" method="post">
          <input type="hidden" name="env" value={imgSrc} id="ienv" />
          <button type="submit" >verify step 2</button>
        </form>

        {/* <a href={imageSrc} download id="download">Click here to download image</a> */}

        <p>{!data ? "Loading..." : data}</p>

      </header>

    </div>
  );
}

export default App;