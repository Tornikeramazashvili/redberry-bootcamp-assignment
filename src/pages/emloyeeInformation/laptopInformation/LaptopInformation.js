import React from "react";
import { Link } from "react-router-dom";

import "../../../pages/emloyeeInformation/laptopInformation/LaptopInformation.css";
import goBackIcon from "../../../assets/icons/goBackIcon.png";

export default function LaptopInformation() {
  return (
    <>
      <div className="container">
        <div className="goBack-container">
          <Link to="/redberry-bootcamp-assignment">
            <img src={goBackIcon} alt="Go back icon" />
          </Link>
        </div>
        <div className="links">
          <Link to="/employeeInformation" className="L-employeeInformation">
            თანამშრომლის ინფო
          </Link>
          <Link to="/laptopInformation" className="L-laptopInformation">
            ლეპტოპის მახასიათებლები
          </Link>gi
        </div>
      </div>
    </>
  );
}
