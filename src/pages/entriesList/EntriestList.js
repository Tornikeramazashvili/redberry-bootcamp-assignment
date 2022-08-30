import React from "react";
import { Link } from "react-router-dom";

import "../../pages/entriesList/EntriestList.css";
import goBackIcon from "../../assets/icons/goBackIcon.png";
import uploadedLaptopImage from "../../assets/images/uploadedLaptopImage.png";

function EntriestList() {
  return (
    <div className="EN-container">
      <div className="EN-goBack-container">
        <Link to="/redberry-bootcamp-assignment">
          <img src={goBackIcon} alt="Go back icon" />
        </Link>
        <div className="EN-content-title-container">
          <h2 className="EN-content-title">ჩანაწერების სია</h2>
        </div>
        <div className="EN-content-title-container-hide">
          <Link to="/redberry-bootcamp-assignment">
            <img src={goBackIcon} alt="Go back icon" />
          </Link>
        </div>
      </div>
      <div className="EN-content-container">
        <div className="EN-content-each-product">
          <div>
            <img src={uploadedLaptopImage} alt="Laptop" />
          </div>
          <div className="EN-content-each-title-container">
            <div className="EN-content-each-title">
              <span className="EN-content-each-owner">ირინე ჩანქსელიანი</span>
              <span className="EN-content-each-owner-laptop">Pentium II</span>
            </div>
            <div className="EN-content-each-title-read-more">
              <Link
                to="/entriesListDetailed"
                className="EN-content-each-title-read-more-button"
              >
                მეტის ნახვა
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntriestList;
