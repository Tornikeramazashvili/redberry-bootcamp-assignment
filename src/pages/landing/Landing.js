import React from "react";
import { useNavigate } from "react-router-dom";

import "../../pages/landing/Landing.css";
import redberryLogo from "../../assets/images/redberryLogo.png";
import landingLogo from "../../assets/images/landingLogo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="L-container">
        <div className="L-image-container">
          <img
            src={redberryLogo}
            alt="Redberry logo"
            className="L-redberryLogo"
          />
          <img src={landingLogo} alt="Landing logo" className="L-landingLogo" />
        </div>
        <div className="L-button-container">
          <button
            className="L-addEntriesButton"
            onClick={() => navigate("/employeeInformation")}
          >
            ჩანაწერის დამატება
          </button>
          <button
            className="L-addEntriesButton"
            onClick={() => navigate("/entriesList")}
          >
            ჩანაწერების სია
          </button>
        </div>
      </div>
    </>
  );
}
