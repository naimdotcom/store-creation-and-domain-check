import { FormField } from "@/types";
import React from "react";

type Props = {
  field: FormField;
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
      <option value="">
        {field.placeholder ? field.placeholder : "Select"}
      </option>
      {field.type === "select" &&
        field.options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
}

export default FormSelectField;
