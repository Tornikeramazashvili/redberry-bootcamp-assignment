import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../components/LaptopForm.css";
import uploadImageFrame from "../assets/images/uploadImageFrame.png";

export default function LaptopForm() {
  // Hooks for localStorage
  const [laptopValues, setLaptopValues] = useState(getLaptopFormValues);

  // running useEffect after changes that may happen to the DOM,
  // setting information and saving changes of VALUES in localStorage
  useEffect(() => {
    localStorage.setItem("employee-information", JSON.stringify(laptopValues));
  }, [laptopValues]);

  // getting values that are already saved in localStorage,
  // and checking with if...else statement to see results eventually
  function getLaptopFormValues() {
    const storedValues = localStorage.getItem("employee-information");
    if (!storedValues)
      return {
        laptop: "",
        CPUcore: "",
        CPUstream: "",
        CPUram: "",
        purchuaseDate: "",
        laptopPrice: "",
      };
    return JSON.parse(storedValues);
  }

  // Preventing form from submitting
  function handleSubmit(event) {
    event.preventDefault();
  }

  // detecting and storing input values
  function handleChange(event) {
    setLaptopValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     localStorage.clear();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="laptopFormContainer">
      <form action="" method="POST" onSubmit={handleSubmit}>
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
              required
              minLength="2"
              type="text"
              placeholder="HP"
              className="laptopInput"
              name="laptop"
              value={laptopValues.laptop}
              onChange={handleChange}
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
            <input
              required
              className="laptopCPUInput"
              placeholder="14"
              name="CPUcore"
              values={laptopValues.CPUcore}
              onChange={handleChange}
            />
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
          <div className="laptopCPUinputContainer">
            <span className="laptopCPUtext">CPU-ს ნაკადი</span>
            <input
              required
              className="laptopCPUInput"
              placeholder="365"
              name="CPUstream"
              value={laptopValues.CPUstream}
              onChange={handleChange}
            />
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
        </div>
        <div className="laptopRAMcontainer">
          <div className="laptopRAM">
            <span className="laptopCPUtext">ლეპტოპის RAM (GB)</span>
            <input
              required
              className="laptopRAMinput"
              placeholder="16"
              name="CPUram"
              values={laptopValues.CPUram}
              onChange={handleChange}
            />
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
              placeholder="დდ / თთ / წწწწ"
              className="laptopInput"
              name="purchuaseDate"
              value={laptopValues.purchuaseDate}
              onChange={handleChange}
            />
          </div>
          <div className="laptopPurchase">
            <label>ლეპტოპის ფასი</label>
            <input
              required
              type="text"
              placeholder="0000"
              className="laptopInput"
              name="laptopPrice"
              value={laptopValues.laptopPrice}
              onChange={handleChange}
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
