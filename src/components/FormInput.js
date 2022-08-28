import "../components/FormInput.css";

const FormInput = () => {
  return (
    <div className="formContainer">
      <form>
        <div className="nameAndSurnameContainer">
          <div className="nameContainer">
            <label>სახელი</label>
            <input placeholder="გრიშა" required className="nameInput" />
            <span className="inputMessage">
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </span>
          </div>
          <div className="surnameContainer">
            <label>გვარი</label>
            <input placeholder="ბაგრატიონი" required className="surnameInput" />
            <span className="inputMessage">
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </span>
          </div>
        </div>
        <select>
          <option hidden="true">თიმი</option>
          <option>დეველოპმენტი</option>
          <option>HR</option>
          <option>გაყიდვები</option>
          <option>დიზაინი</option>
          <option>მარკეტინგი</option>
        </select>
        <select>
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
            placeholder="grish666@redberry.ge"
            required
            className="mailInput"
          />
          <span className="inputMessage">
            უნდა მთავრდებოდეს @redberry.ge-ით
          </span>
        </div>
        <div className="mobileContainer">
          <label>ტელეფონის ნომერი</label>
          <input
            type="text"
            maxLength="13"
            placeholder="+995 598 00 07 01"
            required
            className="mailInput"
          />
          <span className="inputMessage">
            უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
          </span>
        </div>
        <div className="buttonContainer">
          <button className="nextButton">შემდეგი</button>
        </div>
      </form>
    </div>
  );
};

export default FormInput;
