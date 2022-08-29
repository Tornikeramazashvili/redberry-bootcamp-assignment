import React from "react";
import { Link } from "react-router-dom";

import "../../../pages/emloyeeInformation/laptopInformation/LaptopInformation.css";
import goBackIcon from "../../../assets/icons/goBackIcon.png";
import redberryOnlyLogo from "../../../assets/images/redberryOnlyLogo.png";
import LaptopForm from "../../../components/LaptopForm"


export default function LaptopInformation() {
  return (
    <>
      <div className="LA-container">
        <div className="goBack-container">
          <Link to="/redberry-bootcamp-assignment">
            <img src={goBackIcon} alt="Go back icon" />
          </Link>
        </div>
        <div className="links-container">
          <Link to="/employeeInformation" className="L-employeeInformation">
            თანამშრომლის ინფო
          </Link>
          <Link to="/laptopInformation" className="L-laptopInformation">
            ლეპტოპის მახასიათებლები
          </Link>
        </div>
        <div className="E-formContainer">
       <LaptopForm/>
        </div>
        <div className="E-redberryLogoContainer">
          <img src={redberryOnlyLogo} alt="Redberry logo" />
        </div>
      </div>
    </>
  );
}
