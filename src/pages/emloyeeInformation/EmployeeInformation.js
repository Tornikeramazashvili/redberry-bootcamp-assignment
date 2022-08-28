import React from "react";
import { Link } from "react-router-dom";

import redberryOnlyLogo from "../../assets/images/redberryOnlyLogo.png";
import "../../pages/emloyeeInformation/EmployeeInformation.css";
import goBackIcon from "../../assets/icons/goBackIcon.png";
import FormInput from "../../components/FormInput";

export default function EmployeeInformation() {
  return (
    <div className="E-container">
      <div className="goBack-container">
        <Link to="/redberry-bootcamp-assignment">
          <img src={goBackIcon} alt="Go back icon" />
        </Link>
      </div>
      <div className="links-container">
        <Link to="/employeeInformation" className="E-employeeInformation">
          თანამშრომლის ინფო
        </Link>
        <Link to="/laptopInformation" className="E-laptopInformation">
          ლეპტოპის მახასიათებლები
        </Link>
      </div>
      {/* <div className="E-formContainer">
        <FormInput />
      </div>
      <div className="E-redberryLogoContainer">
        <img src={redberryOnlyLogo} alt="Redberry logo" />
      </div> */}
    </div>
  );
}
