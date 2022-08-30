import React from "react";
import { Link } from "react-router-dom";

import "../entriesListDetailed/EntriesListDetailed.css";
import goBackIcon from "../../assets/icons/goBackIcon.png";
import uploadadLaptopInfo from "../../assets/images/uploadadLaptopInfo.png";

function EntriesListDetailed() {
  return (
    <div className="END-container">
      <div className="END-goBack-container">
        <Link to="/entriesList">
          <img src={goBackIcon} alt="Go back icon" />
        </Link>
        <div className="END-content-title-container">
          <h2 className="END-content-title">ლეპტოპის ინფო</h2>
        </div>
        <div className="END-content-title-container-hide">
          <Link to="/redberry-bootcamp-assignment">
            <img src={goBackIcon} alt="Go back icon" />
          </Link>
        </div>
      </div>
      <div className="END-content-container">
        <div className="END-content-each-product">
          <div className="END-content-each-product-laptop-container">
            <img src={uploadadLaptopInfo} alt="Laptop" />
            <div className="END-content-each-product-laptop-information">
              <span>სახელი:</span>
              <span>თიმი:</span>
              <span>პოზიცია:</span>
              <span>მეილი:</span>
              <span>ტელ.ნომერი:</span>
            </div>
            <div className="END-content-each-product-employee-information">
              <span>აკაკი წერეთელი</span>
              <span>დიზაინერები</span>
              <span>ილუსტრატორი</span>
              <span>ako@redberry.ge</span>
              <span>+995 583 45 28 33</span>
            </div>
          </div>
          <div className="END-content-each-laptop-information">
            <div className="END-content-each-laptop-information-inner-div">
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-title">
                  ლეპტოპის სახელი:
                </span>
                <span className="END-content-each-laptop-title">
                  ლეპტოპის ბრენდი:{" "}
                </span>
                <span className="END-content-each-laptop-title">RAM:</span>
                <span className="END-content-each-laptop-title">
                  მეხსიერების ტიპი
                </span>
              </div>
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-respone">
                  Razor bla bla bla
                </span>
                <span className="END-content-each-laptop-respone">Hp</span>
                <span className="END-content-each-laptop-respone">16</span>
                <span className="END-content-each-laptop-respone">SSD</span>
              </div>
            </div>
            <div className="END-content-each-laptop-CPU-information-inner-div">
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-title">CPU:</span>
                <span className="END-content-each-laptop-title">
                  CPU-ს ბირთვი:
                </span>
                <span className="END-content-each-laptop-title">
                  {" "}
                  CPU-ს ნაკადი:
                </span>
              </div>
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-respone">Intel 5</span>
                <span className="END-content-each-laptop-respone">13</span>
                <span className="END-content-each-laptop-respone">67</span>
              </div>
            </div>
          </div>
          <div className="END-content-each-laptop-information-second-part">
            <div className="END-content-each-laptop-information-second-inner-div">
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-title">
                  ლეპტოპის მდგომარეობა:
                </span>
                <span className="END-content-each-laptop-title">
                  ლეპტოპის ფასი:
                </span>
              </div>
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-respone">მეორადი</span>
                <span className="END-content-each-laptop-respone">1500 ₾</span>
              </div>
            </div>
            <div className="END-content-each-laptop-CPU-information-second-inner-div">
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-title">
                  შევსების რიცხვი:
                </span>
              </div>
              <div className="END-content-each-laptop-information-double-inner-div">
                <span className="END-content-each-laptop-respone">
                  12 / 06 / 2130
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntriesListDetailed;
