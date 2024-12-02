import React, { useState, useRef } from "react";
import "./UserPreferencesForm.css"; // Import styles for a polished UI

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
    const newCity = prompt("Please enter the name of the city:");
    if (newCity && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setSelectedCity(newCity); // Automatically select the new city
    } else if (newCity) {
      alert("City already exists in the list!");
    }
  };
  const deleteCity = () => {
    if (!selectedCity) {
      alert("Please select a city to delete.");
      return;
    }
    setCities(cities.filter((city) => city !== selectedCity));
    setSelectedCity(""); // Reset selected city
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

      {/* Notification Method */}
      <div className="form-section">
        <h3 className="section-title">Notification Method:</h3>
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

      {/* Dynamic City Selection */}
      <div className="form-section">
        <h3 className="section-title">Select Your City:</h3>
        <button type="button" className="btn" onClick={addCity}>
          Add City
        </button>
        <button type="button" className="btn" onClick={deleteCity}>
          Delete City
        </button>
        <select
          className="select-menu"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">-- Select a city --</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <p>Selected City: {selectedCity || "None"}</p>
      </div>

      {/* Skills Checkboxes */}
      <div className="form-section">
        <h3 className="section-title">Select Your Skills:</h3>
        {["React", "Node.js", "JavaScript"].map((skill, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              value={skill}
              ref={(el) => (checkboxRefs.current[index] = el)}
              onChange={updateSelectedSkills}
            />
            {skill}
          </label>
        ))}
        <div className="checkbox-actions">
          <button type="button" className="btn" onClick={handleSelectAll}>
            Select All
          </button>
          <button type="button" className="btn" onClick={handleDeselectAll}>
            Deselect All
          </button>
        </div>
        <p>Selected Skills: {selectedSkills.join(", ") || "None"}</p>
      </div>

      {/* Submit Button */}
      <button className="btn submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default UserPreferencesForm;
