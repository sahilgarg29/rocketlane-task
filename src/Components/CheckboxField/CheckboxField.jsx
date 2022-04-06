import React from "react";
import "./checkboxField.css";

const CheckboxField = ({ name, isChecked, isRequired, toggleChecked }) => {
  const handleCheckbox = (e) => {
    let checked = e.target.checked;
    toggleChecked(checked);
  };

  return (
    <div>
      <div className="field checkbox">
        <div className="field__label">
          <label htmlFor={name}>
            {isRequired && <span className="star-required">*</span>}
            {name}
          </label>
        </div>

        <div className="field__input">
          <input
            type="checkbox"
            name={name}
            id={name}
            checked={isChecked}
            onChange={(e) => handleCheckbox(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckboxField;
