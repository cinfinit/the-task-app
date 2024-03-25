import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-black">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder="Enter"
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 block w-full rounded-md border ${
          error ? "border-red-500" : "border-gray-300"
        } p-2 focus:border-indigo-500 focus:outline-none`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
