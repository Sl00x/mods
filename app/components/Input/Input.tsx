"use client";
import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  onTextChange?: (value: string) => void;
}

export const Input = (props: InputProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor="email"
        className="block text-xs font-bold uppercase leading-6 text-gray-600"
      >
        <span className={clsx(props.error ? "text-red-500" : "text-dark")}>
          {props.label}
        </span>
        {props.required && <b className="text-primary">*</b>}
      </label>
      <div className="mt-1">
        <input
          onChange={(e) => {
            props.onTextChange?.(e.target.value);
            props.onChange?.(e);
          }}
          {...props}
          required={false}
          className={clsx(
            props.error ? "ring-red-500" : "ring-gray-300",
            "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900  shadow-sm ring-1 outline-none ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all hover:ring-primary"
          )}
        />
        {props.error && (
          <span className="text-[10px] font-semibold text-red-500 uppercase">
            {props.error}
          </span>
        )}
      </div>
    </div>
  );
};
