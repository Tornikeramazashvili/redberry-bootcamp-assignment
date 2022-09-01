import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Axios from "axios";

import "../components/LaptopForm.css";
// import checkmarkIcon from "../assets/icons/checkmarkIcon.png";
import { PopupMessage } from "./PopupMessage";

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
        laptopName: "",
        laptopBrand:"",
        laptopCPU:"",
        laptopCPUcore: "",
        laptopCPUstream: "",
        laptopCPUram: "",
        laptopPurchuaseDate: "",
        laptopPrice: "",
        laptopImage: "",
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
  // and used axios to post picture on Cloudinary (testing)
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
        setSentImageName(response.data.original_filename);
        setSentImageFormat(response.data.format);
        setSentImageBytes(bytesToMegaBytes(response.data.bytes).toFixed(2));
      })
      .catch((response) => {
        setImageDidntSend(response.response.data?.error?.message);
      });
  };

  const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;
  const [sentImageName, setSentImageName] = useState("");
  const [sentImageFormat, setSentImageFormat] = useState("");
  const [sentImageBytes, setSentImageBytes] = useState("");

  const [imageDidntSend, setImageDidntSend] = useState("");


  // Fetching API data with Axios
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     localStorage.clear();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="laptopFormContainer">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className={"laptopImageContainer"}>
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
            // value={laptopValues.laptopImage}
            // onChange={handleChange}
          />
        </div>
        {/* <span style={{color:'red'}}>{imageDidntSend}</span> */}
        {/* <div className="laptopImageUploadMessage">
          <div className="laptopImageUploadMessageBox">
            <img src={checkmarkIcon} alt="Checkmark" />
            <span className="laptopImageUploadMessageText">
              {sentImageName}.{sentImageFormat}, {sentImageBytes} mb
            </span>
          </div>

          <button className="laptopUploadImageAgainButton">
            თავიდან ატვირთე
          </button>
        </div> */}
        <div className="laptopBrandContainer">
          <div className="laptopNameContainer">
            <label>ლეპტოპის სახელი</label>
            <input
              minLength="2"
              type="text"
              placeholder="HP"
              className="laptopInput"
              name="laptopName"
              value={laptopValues.laptopName}
              onChange={handleChange}
            />
            <span className="inputMessage">
              ლათინური ასოები, ციფრები, !@#$%^&*()_+=
            </span>
          </div>
          <div>
            <select
              className="laptopBrandSelect"
              name="laptopBrand"
              value={laptopValues.laptopBrand}
              onChange={handleChange}
            >
              {brands.map((brand, index) => (
                <option key={index}>{brand.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="laptopCPUcontainer">
          <select
            className="laptopCPUselect"
            name="laptopCPU"
            value={laptopValues.laptopCPU}
            onChange={handleChange}
          >
            {CPUs.map((CPU, index) => (
              <option key={index}>{CPU.name}</option>
            ))}
          </select>
          <div className="laptopCPUinputContainer">
            <span className="laptopCPUtext">CPU-ს ბირთვი</span>
            <input
              className="laptopCPUInput"
              placeholder="14"
              name="laptopCPUcore"
              value={laptopValues.laptopCPUcore}
              onChange={handleChange}
            />
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
          <div className="laptopCPUinputContainer">
            <span className="laptopCPUtext">CPU-ს ნაკადი</span>
            <input
              className="laptopCPUInput"
              placeholder="365"
              name="laptopCPUstream"
              value={laptopValues.laptopCPUstream}
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
              name="laptopCPUram"
              value={laptopValues.laptopCPUram}
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
              <label className="laptopMemoryType"  onChange={handleChange} values>SSD</label>
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
              name="laptopPurchuaseDate"
              value={laptopValues.laptopPurchuaseDate}
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
          {/* <button onClick={uploadImage}>ფოტო</button> */}
          <Popup
            trigger={
              <button className="laptopSaveButton" onClick={uploadImage}>
                დამახსოვრება
              </button>
            }
          >
            <PopupMessage />
          </Popup>
        </div>
      </form>
    </div>
  );
}
