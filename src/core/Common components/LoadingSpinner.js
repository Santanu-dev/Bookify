import React from "react";
import "./LoadingSpinner.css";
import { ThreeCircles } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    // <div className="loadingSpinner">
    //   <div className="app-spinner">
    //     <div className="loading-message">Please Wait...</div>
    //     <div className="animate-boxes">
    //       <div className="box">
    //         <div className="t"></div>
    //         <div className="b"></div>
    //         <div className="l"></div>
    //         <div className="r"></div>
    //         <div className="f"></div>
    //         <div className="back"></div>
    //       </div>
    //       <div className="box">
    //         <div className="t"></div>
    //         <div className="b"></div>
    //         <div className="l"></div>
    //         <div className="r"></div>
    //         <div className="f"></div>
    //         <div className="back"></div>
    //       </div>
    //       <div className="box">
    //         <div className="t"></div>
    //         <div className="b"></div>
    //         <div className="l"></div>
    //         <div className="r"></div>
    //         <div className="f"></div>
    //         <div className="back"></div>
    //       </div>
    //       <div className="box">
    //         <div className="t"></div>
    //         <div className="b"></div>
    //         <div className="l"></div>
    //         <div className="r"></div>
    //         <div className="f"></div>
    //         <div className="back"></div>
    //       </div>
    //       <div className="box">
    //         <div className="t"></div>
    //         <div className="b"></div>
    //         <div className="l"></div>
    //         <div className="r"></div>
    //         <div className="f"></div>
    //         <div className="back"></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="loading-spinner">
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
      <p className="text-white text-center">please wait, fetching data from server...</p>
    </div>
    
  );
};

export default LoadingSpinner;
