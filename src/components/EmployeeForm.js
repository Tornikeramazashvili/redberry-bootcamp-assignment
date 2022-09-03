import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import "../components/EmployeeForm.css";

const EmployeeForm = () => {
  // navigation to the next page
  const navigate = useNavigate();
  // Hooks for storing data
  const [employeeValues, setEmployeeValues] = useState(getEmployeeValues);

  // running useEffect after changes that may happen to the DOM,
  // setting information and saving changes of VALUES in localStorage
  useEffect(() => {
    localStorage.setItem(
      "employee-information",
      JSON.stringify(employeeValues)
    );
  }, [employeeValues]);

  // detecting and storing input values
  function handleChange(event) {
    setEmployeeValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));

    // Name validation
    if (event.target.name === "employeeName") {
      if (!isValidName(event.target.value)) {
        setNameError("გამოიყენე ქართული ასოები");
      } else {
        setNameError(null);
      }
    }
    // Surname validation
    if (event.target.name === "employeeSurname") {
      if (!isValidSurname(event.target.value)) {
        setSurnameError("გამოიყენე ქართული ასოები");
      } else {
        setSurnameError(null);
      }
    }
    // Email validation
    if (event.target.name === "employeeEmail") {
      if (!isValidEmail(event.target.value)) {
        setEmailError("უნდა მთავრდებოდეს @redberry.ge-ით");
      } else {
        setEmailError(null);
      }
    }
    // Mobile validation
    if (event.target.name === "employeeMobile") {
      if (!isValidMobile(event.target.value)) {
        setMobileError("უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს");
      } else {
        setMobileError(null);
      }
    }
  }

  // Error messages for validation
  const [nameError, setNameError] = useState(null);
  const [surnameError, setSurnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [mobileError, setMobileError] = useState(null);

  // Regex for validation
  function isValidName(name) {
    return /^[ა-ჰ]+$/.test(name);
  }

  function isValidSurname(surname) {
    return /^[ა-ჰ]+$/.test(surname);
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidMobile(mobile) {
    return /^(\+?995)?(79\d{7}|5\d{8})$/.test(mobile);
  }

  // ...................................................
  // getting values that are already saved in localStorage,
  // and checking with if...else statement to see results eventually
  function getEmployeeValues() {
    const storedValues = localStorage.getItem("employee-information");
    if (!storedValues)
      return {
        employeeName: "",
        employeeSurname: "",
        employeeEmail: "",
        employeeMobile: "",
        employeeTeam: "",
        employeePosition: "",
      };
    return JSON.parse(storedValues);
  }

  // // Fetching data for swagger
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    Axios.get("https://pcfy.redberryinternship.ge/api/teams").then(
      (response) => {
        setTeams(response?.data?.data);
      }
    );
    Axios.get("https://pcfy.redberryinternship.ge/api/positions").then(
      (response) => {
        setPositions(response?.data?.data);
      }
    );
  }, []);

  // Preventing form from submitting
  function handleSubmit(event) {
    event.preventDefault();
    // here should be axios post
    // localstorage should be in .then
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     localStorage.clear();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="formContainer">
      <form action="" method="POST" onSubmit={handleSubmit} required>
        <div className="nameAndSurnameContainer">
          <div className="nameContainer">
            <label>სახელი</label>
            <input
              minLength="2"
              required
              id="name"
              type="text"
              placeholder="გრიშა"
              className="nameInput"
              name="employeeName"
              value={employeeValues.employeeName}
              onChange={handleChange}
            />
            <span className="inputMessage">
              {nameError ? (
                <h2 className="inputMessageError">{nameError}</h2>
              ) : (
                "მინიმუმ 2 სიმბოლო, ქართული ასოები"
              )}
            </span>
          </div>
          <div className="surnameContainer">
            <label>გვარი</label>
            <input
              minLength="2"
              required
              type="text"
              placeholder="ბაგრატიონი"
              className="surnameInput"
              name="employeeSurname"
              value={employeeValues.employeeSurname}
              onChange={handleChange}
            />
            <span className="inputMessage">
              {surnameError ? (
                <h2 className="inputMessageError">{surnameError}</h2>
              ) : (
                "მინიმუმ 2 სიმბოლო, ქართული ასოები"
              )}
            </span>
          </div>
        </div>
        <select
          required
          className="positionSelect"
          name="employeeTeam"
          value={employeeValues.employeeTeam}
          onChange={handleChange}
        >
          <option disabled={true} value="">
            თიმი
          </option>
          {teams.map((team, index) => (
            <option key={index}>{team.name}</option>
          ))}
        </select>
        <select
          required
          className="positionSelect"
          name="employeePosition"
          value={employeeValues.employeePosition}
          onChange={handleChange}
        >
          <option disabled={true} value="">
            პოზიცია
          </option>
          {positions.map((position, index) => (
            <option key={index}>{position.name}</option>
          ))}
        </select>
        <div className="mailContainer">
          <label>მეილი</label>
          <input
            required
            id="email"
            type="email"
            placeholder="grish666@redberry.ge"
            className="mailInput"
            name="employeeEmail"
            value={employeeValues.employeeEmail}
            onChange={handleChange}
          />
          <span className="inputMessage">
            {emailError ? (
              <h2 className="inputMessageError">{emailError}</h2>
            ) : (
              "უნდა მთავრდებოდეს @redberry.ge-ით"
            )}
          </span>
        </div>
        <div className="mobileContainer">
          <label>ტელეფონის ნომერი</label>
          <input
            maxLength="13"
            required
            type="text"
            placeholder="+995 598 00 07 01"
            className="mailInput"
            name="employeeMobile"
            value={employeeValues.employeeMobile}
            onChange={handleChange}
          />
          <span className="inputMessage">
            {mobileError ? (
              <h2 className="inputMessageError">{mobileError}</h2>
            ) : (
              "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
            )}
          </span>
        </div>
        <div className="buttonContainer">
          <button
            type="submit"
            className="nextButton"
            onSubmit={handleSubmit}
            // onClick={() => navigate("/laptopInformation")}
          >
            შემდეგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
