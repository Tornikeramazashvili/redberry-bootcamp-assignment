import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

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

  // Created useRef for upload button
  //  and used axios to post picture on Cloudinary (testing)
  const inputRef = useRef();
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ouniqbm3");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dzdluvy3z/image/upload",
      formData
    )
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response.response.data?.error?.message);
      });
  };

  // original_filename
  // bytes

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     localStorage.clear();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // Fetching data from swagger
  const [brands, setBrands] = useState([]);
  const [CPUs, setCPUs] = useState([]);

  useEffect(() => {
    Axios.get("https://pcfy.redberryinternship.ge/api/brands").then(
      (response) => {
        setBrands(response.data.data);
      }
    );
    Axios.get("https://pcfy.redberryinternship.ge/api/cpus").then(
      (response) => {
        setCPUs(response.data.data);
      }
    );
  }, []);

  return (
    <div className="laptopFormContainer">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className="laptopImageContainer">
          <span className="laptopImageUploadText">
            ჩააგდე ან ატვირთე ლეპტოპის ფოტო
          </span>
          <button
            onClick={() => {
              console.log(inputRef);
              inputRef.current.click();
            }}
            className="laptopImageUploadButton"
          >
            ატვირთე
          </button>
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
          <img src={uploadImageFrame} alt="Upload frame" />
        </div>
        <div className="laptopBrandContainer">
          <div className="laptopNameContainer">
            <label>ლეპტოპის სახელი</label>
            <input
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
              {brands.map((brand, index) => (
                <option key={index}>{brand.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="laptopCPUcontainer">
          <select className="laptopCPUselect">
            {CPUs.map((CPU, index) => (
              <option key={index}>{CPU.name}</option>
            ))}
          </select>
          <div className="laptopCPUinputContainer">
            <span className="laptopCPUtext">CPU-ს ბირთვი</span>
            <input
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
          <button className="laptopSaveButton" onClick={uploadImage}>
            დამახსოვრება
          </button>
        </div>
      </form>
    </div>
  );
}
