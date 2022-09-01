import React from "react";
import { useNavigate } from "react-router-dom";

import "./PopupMessage.css";
import popupImage from "../assets/images/popupImage.png";

export const PopupMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-content">
          <img src={popupImage} alt="Firework" />
          <span className="popup-message">ჩანაწერი დამატებულია!</span>
          <div className="popup-button-container">
            <button
              className="popup-button-entries"
              onClick={() => navigate("/entriesList")}
            >
              სიაში გადაყვანა
            </button>
            <button
              className="popup-button-main"
              onClick={() => navigate("/redberry-bootcamp-assignment")}
            >
              მთავარი
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
