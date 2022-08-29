import React from "react";
import { useNavigate, Link } from "react-router-dom";

import "../components/LaptopForm.css";
import uploadImageFrame from "../assets/images/uploadImageFrame.png";

export default function LaptopForm() {
  const navigate = useNavigate();

  return (
    <div className="laptopFormContainer">
      <form action="" method="POST">
        <div className="laptopImageContainer">
          <span className="laptopImageUploadText">
            ჩააგდე ან ატვირთე ლეპტოპის ფოტო
          </span>
          <button className="laptopImageUploadButton">ატვირთე</button>
          <img src={uploadImageFrame} alt="Upload frame" />
        </div>
        <div className="laptopBrandContainer">
          <div className="laptopNameContainer">
            <label>ლეპტოპის სახელი</label>
            <input
              minLength="2"
              type="text"
              // required
              placeholder="HP"
              className="laptopInput"
              // value={values.name}
              // name="name"
              // onChange={handleChange}
            />
            <span className="inputMessage">
              ლათინური ასოები, ციფრები, !@#$%^&*()_+=
            </span>
          </div>
          <div>
            <select className="laptopBrandSelect">
              <option hidden="true">ლეპტოპის ბრენდი</option>
              <option>HP</option>
              <option>Dell</option>
              <option>Miscrosoft</option>
              <option>Apple</option>
              <option>Lenovo</option>
            </select>
          </div>
        </div>
        <div className="laptopCPUcontainer">
          <select className="laptopCPUselect">
            <option hidden="true">CPU</option>
            <option>Intel Core i3</option>
            <option>Intel Core i5</option>
            <option>Intel Core i7</option>
            <option>Intel Core i9</option>
            <option>AMD Ryzen 3</option>
          </select>
          <div className="laptopCPUinputContainer">
            <span className="laptopCPUtext">CPU-ს ბირთვი</span>
            <input className="laptopCPUInput" placeholder="14" />
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
          <div className="laptopCPUinputContainer">
            <span className="laptopCPUtext">CPU-ს ნაკადი</span>
            <input className="laptopCPUInput" placeholder="365" />
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
        </div>
        <div className="laptopRAMcontainer">
          <div className="laptopRAM">
            <span className="laptopCPUtext">ლეპტოპის RAM (GB)</span>
            <input className="laptopRAMinput" placeholder="16" />
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
          <div className="laptopRAMmemory">
            <div>
              <span className="laptopCPUtext">მეხსიერების ტიპი</span>
            </div>
            <div>
              <input type="radio" className="laptopCPUinput" />
              <label className="laptopMemoryType">SSD</label>
              <input type="radio" className="laptopCPUtypeInput" />
              <label className="laptopCPUtypeText">HDD</label>
            </div>
          </div>
        </div>
        <div className="laptopPurchaseContainer">
          <div className="laptopPurchase">
            <label>შეძენის რიცხვი (არჩევითი)</label>
            <input
              type="text"
              // required
              placeholder="დდ / თთ / წწწწ"
              className="laptopInput"
              // value={values.name}
              // name="name"
              // onChange={handleChange}
            />
          </div>
          <div className="laptopPurchase">
            <label>ლეპტოპის ფასი</label>
            <input
              type="text"
              // required
              placeholder="0000"
              className="laptopInput"
              // value={values.name}
              // name="name"
              // onChange={handleChange}
            />
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
        </div>
        <div>
          <label>ლეპტოპის მდგომარეობა</label>
          <div className="laptopPostureContainer">
            <input type="radio" className="laptopCPUinput" />
            <label className="laptopMemoryType">ახალი</label>
            <input type="radio" className="laptopCPUtypeInput" />
            <label className="laptopCPUtypeText">მეორადი</label>
          </div>
        </div>
        <div className="laptopButtons">
          <Link to={-1} className="laptopBackButton">
            უკან
          </Link>
          <button className="laptopSaveButton">დამახსოვრება</button>
        </div>
      </form>
    </div>
  );
}
