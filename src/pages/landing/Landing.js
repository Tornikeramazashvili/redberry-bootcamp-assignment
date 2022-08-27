import React from "react";
import redberryLogo from "../../assets/images/redberryLogo.png";
import landingLogo from "../../assets/images/landingLogo.png";
import "../../pages/landing/Landing.css";

export default function Landing() {
  return (
    <>
      <div className="container">
        <div className="image-container">
          <img
            src={redberryLogo}
            alt="Redberry logo"
            className="redberryLogo"
          />
          <img src={landingLogo} alt="Landing logo" className="landingLogo" />
        </div>
        <div className="button-container">
          <button className="addEntriesButton">ჩანაწერის დამატება</button>
          <button className="addEntriesButton">ჩანაწერების სია</button>
        </div>
      </div>
    </>
  );
}
