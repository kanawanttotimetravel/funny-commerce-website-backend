import React from 'react';
import "./style.css";

const EditableField = ({ label, name, value, onChange }) => {
  return (
    <div className="editable-field">
      <label>{label}:</label>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default EditableField;