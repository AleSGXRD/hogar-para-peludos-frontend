import { useState, useRef, useEffect } from 'react';

export const CustomSelect = ({ options, value, onChange, placeholder, icons = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-48" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full cursor-pointer px-4 py-2 text-left bg-gray-50 border border-gray-200 rounded-lg shadow-md transition-all duration-200 ${
          isOpen ? 'ring-2 ring-[#76ca99] border-[#76ca99]' : 'hover:border-gray-300'
        }`}
      >
        <div className="flex items-center">
          {value && icons[value] && (
            <span className="mr-2">{icons[value]}</span>
          )}
          <span className="text-gray-700">
            {value ? options.find(opt => opt.value === value)?.label : placeholder}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <ul className="py-1 overflow-auto text-base max-h-60">
            <li
              key="empty"
              onClick={() => handleSelect('')}
              className={`px-4 py-2 cursor-pointer hover:bg-[#b8edce] ${
                value === '' ? 'bg-[#76ca99]' : ''
              }`}
            >
              {placeholder}
            </li>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#b8edce] ${
                  value === option.value ? 'bg-[#76ca99]' : ''
                }`}
              >
                {icons[option.value] && (
                  <span className="mr-2">{icons[option.value]}</span>
                )}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
// Iconos para los selects
export const genderIcons = {
  male: (
    <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 14a5 5 0 1 0 10 0a5 5 0 1 0-10 0m14-9l-5.4 5.4M19 5h-5m5 0v5"/>
    </svg>
  ),
  female: (
    <svg className="w-4 h-4 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 9a5 5 0 1 0 10 0A5 5 0 1 0 7 9m5 5v7m-3-3h6"/>
    </svg>
  )
};