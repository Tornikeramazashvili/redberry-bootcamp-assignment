import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../components/EmployeeForm.css";

const EmployeeForm = () => {
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

  const navigate = useNavigate();

  function clearLocalStorage() {
    localStorage.clear();
  }

  return (
    <div className="formContainer">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className="nameAndSurnameContainer">
          <div className="nameContainer">
            <label>სახელი</label>
            <input
              minLength="2"
              type="text"
              required
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
          <option hidden="true">თიმი</option>
          <option>დეველოპმენტი</option>
          <option>HR</option>
          <option>გაყიდვები</option>
          <option>დიზაინი</option>
          <option>მარკეტინგი</option>
        </select>
        <select className="positionSelect">
          <option hidden="true">პოზიცია</option>
          <option>დეველოპმენტი</option>
          <option>HR</option>
          <option>გაყიდვები</option>
          <option>დიზაინი</option>
          <option>მარკეტინგი</option>
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
          <button onClick={clearLocalStorage}>Clear local storage</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
