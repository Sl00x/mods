"use client";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "@remixicon/react";
import clsx from "clsx";
import { useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options?: SelectOption[];
  name?: string;
  onOptionChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export const Select = (props: SelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const filteredOptions = props.options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: SelectOption) => {
    setSelectedOption(option.label);
    props.onOptionChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
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
        <div
          className={clsx(
            props.error ? "ring-red-500" : "ring-gray-300",
            "flex flex-row justify-between items-center bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all hover:ring-primary cursor-pointer"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectedOption || props.placeholder || (
              <p className="text-gray-400">Select an option</p>
            )}
          </span>
          <div className="flex flex-row space-x-2">
            <div className="border-l border-gray-200 h-full">
              {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </div>
          </div>
        </div>
        {props.error && (
          <span className="text-[10px] font-semibold text-red-500 uppercase">
            {props.error}
          </span>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <div className="p-2">
            <input
              name={props.name}
              autoFocus={isOpen}
              type="text"
              className={clsx(
                "w-full px-2 py-1 border border-gray-200 rounded-md ring-0 outline-none text-gray-900 placeholder:text-gray-400 sm:text-sm"
              )}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm">
            {filteredOptions && filteredOptions.length > 0 ? (
              filteredOptions?.map((option) => (
                <li
                  key={option.value}
                  className={clsx(
                    selectedOption == option.label && "bg-primary text-white",
                    "cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-primary/50 hover:text-dark"
                  )}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500">
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
