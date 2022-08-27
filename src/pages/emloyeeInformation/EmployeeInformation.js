import React from "react";
import { Link } from "react-router-dom";

import "../../pages/emloyeeInformation/EmployeeInformation.css";
import goBackIcon from "../../assets/icons/goBackIcon.png";

export default function EmployeeInformation() {
  return (
    <>
      <div className="container">
        <div className="goBack-container">
          <Link to="/">
            <img src={goBackIcon} alt="Go back icon" />
          </Link>
        </div>
        <div className="links">
          <Link to="/employeeInformation" className="E-employeeInformation">
            თანამშრომლის ინფო
          </Link>
          <Link to="/laptopInformation" className="E-laptopInformation">
            ლეპტოპის მახასიათებლები
          </Link>
        </div>
      </div>
    </>
  );
}
