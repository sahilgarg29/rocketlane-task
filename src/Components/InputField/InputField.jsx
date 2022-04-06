import React from "react";
import "./inputField.css";

const InputField = ({ name, placeHolder, isRequired, text, setText }) => {
  return (
    <div className="field">
      <div className="field__label">
        <label htmlFor={name}>
          {isRequired && <span className="star-required">*</span>}
          {name}
        </label>
      </div>

      <div className="field__input">
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeHolder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputField;
