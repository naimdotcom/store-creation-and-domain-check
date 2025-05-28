import React from "react";

type Props = {
  field: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInputField = ({ field, onChange }: Props) => {
  return (
    <input
      type={field.inputType}
      name={field.name}
      placeholder={field.placeholder}
      className={`border px-2 py-3.5 rounded-md focus-visible:outline-none transition-colors ${
        field.error ? "border-red-500" : "border-gray-300"
      }`}
      value={field.value}
      onChange={onChange}
    />
  );
};

export default FormInputField;
