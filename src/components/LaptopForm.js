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
    // console.log(laptopValues);
  }, [laptopValues]);

  // getting values that are already saved in localStorage,
  // and checking with if...else statement to see results eventually
  function getLaptopFormValues() {
    const storedValues = localStorage.getItem("employee-information");
    if (!storedValues)
      return {
        laptopName: "",
        laptopBrand: "",
        laptopCPU: "",
        laptopCPUcore: "",
        laptopCPUstream: "",
        laptopCPUram: "",
        laptopPurchuaseDate: "",
        laptopPrice: "",
        laptopImage: "",
        laptopMemoryType: "",
        laptopCondition: "",
      };
    return JSON.parse(storedValues);
  }

  // Preventing form from submitting
  function handleSubmit(event) {
    event.preventDefault();
    // localStorage.clear();
  }

  // detecting and storing input values
  function handleChange(event) {
    let v = event.target.value;
    setLaptopValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: v,
    }));
    // validation
    if (event.target.name === "laptopName") {
      if (!isValidName(event.target.value)) {
        setLaptopNameError("ლათინური ასოები, ციფრები, !@#$%^&*()_+= ");
      } else {
        setLaptopNameError(null);
      }
    }
  }
  // Error messages for validation
  const [laptopNameError, setLaptopNameError] = useState(null);

  // Regex for validation
  function isValidName(laptopName) {
    return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(laptopName);
  }

  // Created useRef for upload button
  // and used axios to post picture on Cloudinary (testing)
  const inputRef = useRef();
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    setImageDidntSend(false);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ouniqbm3");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dzdluvy3z/image/upload",
      formData
    )
      .then((response) => {
        // setSentImageName(response.data.original_filename);
        // setSentImageFormat(response.data.format);
        // setSentImageBytes(bytesToMegaBytes(response.data.bytes).toFixed(2));
      })
      .catch((response) => {
        setImageDidntSend(response.response.data?.error?.message);
      });
  };

  const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;
  // const [sentImageName, setSentImageName] = useState(false);
  // const [sentImageFormat, setSentImageFormat] = useState(false);
  // const [sentImageBytes, setSentImageBytes] = useState(false);
  const [imageDidntSend, setImageDidntSend] = useState(false);

  // Fetching API data with Axios
  const [brands, setBrands] = useState([]);
  const [CPUs, setCPUs] = useState([]);

  useEffect(() => {
    Axios.get("https://pcfy.redberryinternship.ge/api/brands").then(
      (response) => {
        setBrands(response?.data?.data);
      }
    );
    Axios.get("https://pcfy.redberryinternship.ge/api/cpus").then(
      (response) => {
        setCPUs(response?.data?.data);
      }
    );
  }, []);

  // Input types
  const inputTypeRadios = [
    {
      id: "1",
      name: "HDD",
      checked: false,
    },
    {
      id: "2",
      name: "SSD",
      checked: false,
    },
  ];

  const inputLeptopCondition = [
    {
      id: "1",
      name: "ახალი",
      checked: "false",
    },
    {
      id: "2",
      name: "მეორადი",
      checked: "false",
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     localStorage.clear();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="laptopFormContainer">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div
          className={`laptopImageContainer ${
            imageDidntSend && "InvalidLaptopImage"
          }`}
        >
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
        {/* ... */}
        {/* <div className={`"laptopImageUploadMessage" ${sentImageName} && "za" `}>
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
        {/*  */}
        <div className="laptopBrandContainer">
          <div className="laptopNameContainer">
            <label>ლეპტოპის სახელი</label>
            <input
              required
              minLength="2"
              type="text"
              placeholder="HP"
              className="laptopInput"
              name="laptopName"
              value={laptopValues.laptopName}
              onChange={handleChange}
            />
            <span className="inputMessage">
              {laptopNameError ? (
                <h2 className="inputMessageError">{laptopNameError}</h2>
              ) : (
                "ლათინური ასოები, ციფრები, !@#$%^&*()_+="
              )}
            </span>
          </div>
          <div>
            <select
              required
              className="laptopBrandSelect"
              name="laptopBrand"
              value={laptopValues.laptopBrand}
              onChange={handleChange}
            >
              <option disabled={true} value="">
                ლეპტოპის ბრენდი
              </option>
              {brands.map((brand, index) => (
                <option key={index}>{brand.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="laptopCPUcontainer">
          <select
            required
            className="laptopCPUselect"
            name="laptopCPU"
            value={laptopValues.laptopCPU}
            onChange={handleChange}
          >
            <option disabled={true} value="">
              CPU
            </option>
            {CPUs.map((CPU, index) => (
              <option key={index}>{CPU.name}</option>
            ))}
          </select>
          <div className="laptopCPUinputContainer">
            <span className="laptopCPUtext">CPU-ს ბირთვი</span>
            <input
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              required
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
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              required
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
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              required
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
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                columnGap: 20,
              }}
            >
              {inputTypeRadios.map((radio, index) => (
                <>
                  <label key={index}>{radio.name}</label>
                  <input
                    required
                    type="radio"
                    name="laptopMemoryType"
                    checked={
                      laptopValues.laptopMemoryType === radio.name && true
                    }
                    value={radio.name}
                    onChange={handleChange}
                  />
                </>
              ))}
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
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
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
        <div style={{ marginTop: 83 }}>
          <label>ლეპტოპის მდგომარეობა</label>
          <div className="laptopPostureContainer">
            <div
              style={{
                display: "flex",
                columnGap: 20,
                // flexDirection: "row-reverse",
              }}
            >
              {inputLeptopCondition.map((condition, index) => (
                <>
                  <input
                    required
                    type="radio"
                    name="laptopCondition"
                    checked={
                      laptopValues.laptopCondition === condition.name && true
                    }
                    value={condition.name}
                    onChange={handleChange}
                  />
                  <label key={index}>{condition.name}</label>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="laptopButtons">
          <Link to={-1} className="laptopBackButton">
            უკან
          </Link>
          {/* <button onClick={uploadImage}>click</button> */}

          <button
            className="laptopSaveButton"
            onSubmit={handleSubmit}
            onClick={(uploadImage, uploadImage)}
          >
            დამახსოვრება
          </button>
        </div>
      </form>
    </div>
  );
}
