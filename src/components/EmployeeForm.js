import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import "../components/EmployeeForm.css";

const EmployeeForm = () => {
  const navigate = useNavigate();

  // Hooks for storing data
  const [values, setValues] = useState(getFormValues);

  // running useEffect after changes that may happen to the DOM,
  // setting information and saving changes of VALUES in localStorage
  useEffect(() => {
    localStorage.setItem("employee-information", JSON.stringify(values));
  }, [values]);

  // getting values that are already saved in localStorage,
  // and checking with if...else statement to see results eventually
  function getFormValues() {
    const storedValues = localStorage.getItem("employee-information");
    if (!storedValues)
      return {
        name: "",
        surname: "",
        email: "",
        mobile: "",
      };
    return JSON.parse(storedValues);
  }

  // Preventing form from submitting
  function handleSubmit(event) {
    event.preventDefault();
  }

  // detecting and storing input values
  function handleChange(event) {
    setValues((previousValues) => ({
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

  // // Fetching data for swagger
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    Axios.get("https://pcfy.redberryinternship.ge/api/teams").then(
      (response) => {
        setTeams(response.data.data);
      }
    );
    Axios.get("https://pcfy.redberryinternship.ge/api/positions").then(
      (response) => {
        setPositions(response.data.data);
      }
    );
  }, []);


  return (
    <div className="formContainer">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className="nameAndSurnameContainer">
          <div className="nameContainer">
            <label>სახელი</label>
            <input
              required
              minLength="2"
              type="text"
              placeholder="გრიშა"
              className="nameInput"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <span className="inputMessage">
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </span>
          </div>
          <div className="surnameContainer">
            <label>გვარი</label>
            <input
              minLength="2"
              type="text"
              required
              placeholder="ბაგრატიონი"
              className="surnameInput"
              name="surname"
              value={values.surname}
              onChange={handleChange}
            />
            <span className="inputMessage">
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </span>
          </div>
        </div>
        <select className="positionSelect">
          {teams.map((team, index) => (
            <option key={index}>{team.name}</option>
          ))}
        </select>
        <select className="positionSelect">
          {positions.map((position, index) => (
            <option key={index}>{position.name}</option>
          ))}
        </select>
        <div className="mailContainer">
          <label>მეილი</label>
          <input
            type="email"
            required
            placeholder="grish666@redberry.ge"
            className="mailInput"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <span className="inputMessage">
            უნდა მთავრდებოდეს @redberry.ge-ით
          </span>
        </div>
        <div className="mobileContainer">
          <label>ტელეფონის ნომერი</label>
          <input
            required
            type="text"
            maxLength="13"
            placeholder="+995 598 00 07 01"
            className="mailInput"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
          />
          <span className="inputMessage">
            უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
          </span>
        </div>
        <div className="buttonContainer">
          <button
            type="submit"
            className="nextButton"
            onClick={() => navigate("/laptopInformation")}
          >
            შემდეგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;