import React, { useState, useRef } from "react";
import "./UserPreferencesForm.css"; // Importation de la feuille de styles

function UserPreferencesForm() {
  const [notificationMethod, setNotificationMethod] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState(["Paris", "London", "New York"]);
  const checkboxRefs = useRef([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleNotificationChange = (e) => {
    setNotificationMethod(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const addCity = () => {
    setCities([...cities, "Tokyo"]);
  };

  const handleSelectAll = () => {
    checkboxRefs.current.forEach((checkbox) => {
      checkbox.checked = true;
    });
    updateSelectedSkills();
  };

  const handleDeselectAll = () => {
    checkboxRefs.current.forEach((checkbox) => {
      checkbox.checked = false;
    });
    updateSelectedSkills();
  };

  const updateSelectedSkills = () => {
    const selected = checkboxRefs.current
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    setSelectedSkills(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Preferences:
Notification Method: ${notificationMethod}
City: ${selectedCity}
Skills: ${selectedSkills.join(", ")}`
    );
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">User Preferences Form</h2>

      {/* Radio buttons */}
      <div className="form-section">
        <h3 className="section-title">Notification Method : </h3>
        <label className="radio-label">
          <input
            type="radio"
            value="Email"
            checked={notificationMethod === "Email"}
            onChange={handleNotificationChange}
          />
          Email
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value="SMS"
            checked={notificationMethod === "SMS"}
            onChange={handleNotificationChange}
          />
          SMS
        </label>
        <div className="message">
          {notificationMethod === "Email" ? (
            <p>You will receive notifications via Email.</p>
          ) : notificationMethod === "SMS" ? (
            <p>You will receive notifications via SMS.</p>
          ) : (
            <p>Please select a notification method.</p>
          )}
        </div>
      </div>

      {/* Select dynamique */}
      <div className="form-section">
        <h3 className="section-title">Select Your City : </h3>
        <button type="button" className="btn" onClick={addCity}>
          Add Tokyo
        </button>
        <select
          className="select-menu"
          value={selectedCity}
          onChange={handleCityChange}
        >
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <p>Selected City: {selectedCity}</p>
      </div>

      {/* Checkboxes */}
      <div className="form-section">
        <h3 className="section-title">Select Your Skills : </h3>
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="React"
            ref={(el) => (checkboxRefs.current[0] = el)}
            onChange={updateSelectedSkills}
          />
          React
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="Node.js"
            ref={(el) => (checkboxRefs.current[1] = el)}
            onChange={updateSelectedSkills}
          />
          Node.js
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="JavaScript"
            ref={(el) => (checkboxRefs.current[2] = el)}
            onChange={updateSelectedSkills}
          />
          JavaScript
        </label>
        <div className="checkbox-actions">
          <button type="button" className="btn" onClick={handleSelectAll}>
            Select All
          </button>
          <button type="button" className="btn" onClick={handleDeselectAll}>
            Deselect All
          </button>
        </div>
        <p>Selected Skills: {selectedSkills.join(", ")}</p>
      </div>

      {/* Submit */}
      <button className="btn submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default UserPreferencesForm;
