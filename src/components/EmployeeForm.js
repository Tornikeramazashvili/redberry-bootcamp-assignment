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

  // detecting and storing input values
  function handleChange(event) {
    setEmployeeValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));

    // Validations
    if (event.target.name === "employeeName") {
      if (!isValidName(event.target.value)) {
        setNameError("გამოიყენე ქართული ასოები");
      } else {
        setNameError(null);
      }
    }

    if (event.target.name === "employeeSurname") {
      if (!isValidSurname(event.target.value)) {
        setSurnameError("გამოიყენე ქართული ასოები");
      } else {
        setSurnameError(null);
      }
    }

    if (event.target.name === "employeeEmail") {
      if (!isValidEmail(event.target.value)) {
        setEmailError("უნდა მთავრდებოდეს @redberry.ge-ით");
      } else {
        setEmailError(null);
      }
    }

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

  // Regex for validations
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

  // Fetching data for swagger
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

  // if everything is filled, go to the next page
  function SubmitButton() {
    if (
      employeeValues.employeeName &&
      employeeValues.employeeSurname &&
      employeeValues.employeeTeam &&
      employeeValues.employeePosition &&
      employeeValues.employeeEmail &&
      employeeValues.employeeMobile
    ) {
      navigate("/laptopInformation");
    } else {
      return <button type="button" disabled />;
    }
  }

  // Preventing form from submitting
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} required>
        <div className="nameAndSurnameContainer">
          <div className="nameContainer">
            <label>სახელი</label>
            <input
              required
              type="text"
              minLength="2"
              name="employeeName"
              placeholder="გრიშა"
              className={`nameInput ${nameError && "inputMessageBorder"}`}
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
              required
              type="text"
              minLength="2"
              name="employeeSurname"
              placeholder="ბაგრატიონი"
              className={`nameInput ${surnameError && "inputMessageBorder"}`}
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
          <option hidden={true} value="">
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
          <option hidden={true} value="">
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
            type="email"
            name="employeeEmail"
            placeholder="grish666@redberry.ge"
            className={`mailInput ${emailError && "inputMessageBorder"}`}
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
            required
            type="text"
            maxLength="13"
            name="employeeMobile"
            placeholder="+995 598 00 07 01"
            className={`mailInput ${mobileError && "inputMessageBorder"}`}
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
          <button type="submit" className="nextButton" onClick={SubmitButton}>
            შემდეგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
