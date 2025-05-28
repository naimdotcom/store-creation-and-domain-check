import React from "react";

type Props = {
  field: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function FormSelectField({ field, onChange }: Props) {
  return (
    <select
      name={field.name}
      className="border px-2 py-3.5 rounded-md focus-visible:outline-none border-gray-300 transition-colors"
      value={field.value}
      onChange={onChange}
    >
      <option value="">{field.placeholder}</option>
      {field.options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FormSelectField;
