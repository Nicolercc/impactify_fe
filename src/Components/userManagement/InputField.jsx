import React from "react";
import { Form } from "react-bootstrap";

const InputField = ({ label, type, placeholder, value, name, onChange }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default InputField;
