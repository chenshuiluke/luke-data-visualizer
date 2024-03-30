"use client";
import React, { useState } from "react";
import { IntervalNumbers, isIntervalNumber } from "../types/Stock";

type Option = { label: string; value: number };
type SelectProps = {
  options: Array<Option>;
  placeholder: string;
  onChange: (number: IntervalNumbers) => void;
};

const Select: React.FC<SelectProps> = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = (): void => setIsOpen(!isOpen);
  const onOptionClicked = (option: Option) => (): void => {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (isIntervalNumber(option.value)) {
      onChange(option.value);
    }
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>{selectedOption || placeholder}</span>
        <div className="w-4 h-4 inline-block">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-64 bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={onOptionClicked(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
