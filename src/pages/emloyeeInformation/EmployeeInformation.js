import React from "react";
import { Link } from "react-router-dom";

import "../../pages/emloyeeInformation/EmployeeInformation.css";
import redberryOnlyLogo from "../../assets/images/redberryOnlyLogo.png";
import goBackIcon from "../../assets/icons/goBackIcon.png";
import EmployeeForm from "../../components/EmployeeForm";

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
      <div className="E-formContainer">
        <EmployeeForm />
      </div>
      <div className="E-redberryLogoContainer">
        <img src={redberryOnlyLogo} alt="Redberry logo" />
      </div>
    </div>
  );
}
