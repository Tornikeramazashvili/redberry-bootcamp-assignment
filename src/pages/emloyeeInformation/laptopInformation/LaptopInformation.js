import React from "react";
import { Link } from "react-router-dom";

import "../../../pages/emloyeeInformation/laptopInformation/LaptopInformation.css";
import goBackIcon from "../../../assets/icons/goBackIcon.png";
import redberryOnlyLogo from "../../../assets/images/redberryOnlyLogo.png";
import FormInput from "../../../components/FormInput";

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
          {/* <FormInput /> */}
        </div>
        {/* <div className="E-redberryLogoContainer">
          <img src={redberryOnlyLogo} alt="Redberry logo" />
        </div> */}
      </div>
    </>
  );
}
