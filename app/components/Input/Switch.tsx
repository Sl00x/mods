"use client";
import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

const Switch = (props: SwitchProps) => {
  const handleChange = (e: any) => {
    props.onChange?.(e);
  };

  return (
    <div className="flex flex-row space-x-4">
      {props.label && (
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase leading-6 text-gray-600"
        >
          {props.label}
          {props.required && <b className="text-primary">*</b>}
        </label>
      )}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          {...props}
          type="checkbox"
          onChange={handleChange}
          className="sr-only"
        />
        <div
          className={clsx(
            props.checked ? "bg-primary" : "bg-gray-200",
            "w-11 h-6 rounded-full peer transition-colors duration-300 border border-gray-300"
          )}
        >
          <div
            className={clsx(
              "absolute left-0 top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-300",
              props.checked ? "translate-x-6" : "translate-x-1"
            )}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
