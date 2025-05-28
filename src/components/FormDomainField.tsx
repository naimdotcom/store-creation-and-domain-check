import React from "react";

type Props = {
  field: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormDomainField({ field, onChange }: Props) {
  return (
    <div>
      <div
        className={`flex items-center border px-2 py-3.5 w-full rounded-md transition-colors ${
          field.error
            ? "border-red-500"
            : field.isDomainAvailable
            ? "border-green-500"
            : "border-gray-300"
        }`}
      >
        <input
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          className="flex-1 focus-visible:outline-none"
          value={field.value}
          onChange={onChange}
        />
        <span className="text-gray-500 ml-2 text-sm sm:text-base">
          {field.suffix}
        </span>
      </div>
      {field.value && !field.error && field.isDomainAvailable && (
        <span className="text-green-500 text-sm mt-1 block">
          Domain is available.
        </span>
      )}
    </div>
  );
}

export default FormDomainField;
