import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import "../components/LaptopForm.css";
import GEL from "../assets/icons/GEL.png";

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

  // Regex for validations
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
      .then((response) => {})
      .catch((response) => {
        setImageDidntSend(response.response.data?.error?.message);
      });
  };

  // laptop image didn't upload error mesage
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

  // Custom inputs for memory type and laptopcondition
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

  const inputLaptopCondition = [
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

  // if everything is filled, submit the form
  function SendForm() {
    if (
      uploadImage() &&
      laptopValues.laptopName &&
      laptopValues.laptopBrand &&
      laptopValues.laptopCPU &&
      laptopValues.laptopCPUcore &&
      laptopValues.laptopCPUstream &&
      laptopValues.laptopCPUram &&
      laptopValues.laptopPrice &&
      laptopValues.laptopMemoryType &&
      laptopValues.laptopCondition
    ) {
      return <></>;
    } else {
      return <button type="button" disabled />;
    }
  }

  // Sending form to the server

  // const [employeeInfo, setEmployeeInfo] = useState({});

  // useEffect(() => {
  //   setEmployeeInfo(JSON.parse(localStorage.getItem("employee-information")));
  // }, []);

  // const headers = {"Content-Type": "application/json"};
  // const url = "https://pcfy.redberryinternship.ge/api/laptop/create";

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formData = new FormData();

    // formData.append("name", employeeInfo?.employeeName);
    // formData.append("surname", employeeInfo?.employeeSurname);
    // formData.append("team_id", employeeInfo?.employeeTeam);
    // formData.append("position_id", employeeInfo?.employeePosition);
    // formData.append("phone_number", employeeInfo?.employeeMobile);
    // formData.append("email", employeeInfo?.employeeEmail);
    // formData.append("token", "24f4bdaed401dc0718b72e08c47d76ff");
    // formData.append("laptop_name", employeeInfo?.laptopName);
    // formData.append("laptop_image", imageSelected);
    // formData.append("laptop_brand_id", employeeInfo?.laptopBrand);
    // formData.append("laptop_cpu", employeeInfo?.laptopCPU);
    // formData.append("laptop_cpu_cores", employeeInfo?.laptopCPUcore);
    // formData.append("laptop_cpu_threads", employeeInfo?.laptopCPUstream);
    // formData.append("laptop_ram", employeeInfo?.laptopCPUram);
    // formData.append("laptop_hard_drive_type", employeeInfo?.laptopMemoryType);
    // formData.append("laptop_state", employeeInfo?.laptopCondition);
    // formData.append("laptop_purchase_date", employeeInfo?.laptopPurchuaseDate);
    // formData.append("laptop_price", employeeInfo?.laptopPrice);

    // Axios.post(url, formData, {
    //   headers: headers,
    // })
    //   .then((response) => console.log("Success:", response))
    //   .catch((response) => {
    //     setImageDidntSend(response.response.data?.error?.message);
    //   });
  };

  return (
    <div className="laptopFormContainer">
      <form onSubmit={handleSubmit} required>
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
          />
        </div>
        <div className="laptopBrandContainer">
          <div className="laptopNameContainer">
            <label>ლეპტოპის სახელი</label>
            <input
              id="laptopName"
              required
              type="text"
              name="laptopName"
              placeholder="HP"
              className="laptopInput"
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
              <option hidden={true} value="">
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
            <option hidden={true} value="">
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
            <div className="laptopCPUmemoryTypeContainer">
              {inputTypeRadios.map((radio, index) => (
                <div className="laptopMemoryTypeInputContainer">
                  <label key={index}>{radio.name}</label>
                  <input
                    required
                    type="radio"
                    name="laptopMemoryType"
                    checked={
                      laptopValues.laptopMemoryType === radio.name && true
                    }
                    className="laptopMemoryTypeInput"
                    value={radio.name}
                    onChange={handleChange}
                  />
                </div>
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
            <div className="laptopPurchaseInputContainer">
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
              <img src={GEL} alt="Gel" className="laptopPurchaseGel" />
            </div>
            <span className="laptopCPUmessage">მხოლოდ ციფრები</span>
          </div>
        </div>
        <div className="laptopConditionContainer">
          <label>ლეპტოპის მდგომარეობა</label>
          <div className="laptopCondition">
            <div className="laptopConditionSelect">
              {inputLaptopCondition.map((condition, index) => (
                <div className="laptopConditionSelectContainer">
                  <input
                    required
                    type="radio"
                    name="laptopCondition"
                    checked={
                      laptopValues.laptopCondition === condition.name && true
                    }
                    className="laptopConditionSelectInput"
                    value={condition.name}
                    onChange={handleChange}
                  />
                  <label key={index}>{condition.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="laptopButtons">
          <Link to={-1} className="laptopBackButton">
            უკან
          </Link>
          <button className="laptopSaveButton" type="submit" onClick={SendForm}>
            დამახსოვრება
          </button>
        </div>
      </form>
    </div>
  );
}
