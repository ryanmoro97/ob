import React, { useState, useEffect, useRef } from 'react';
import '../styles/Filters.css';


function InputDropDown({ options, placeholder }) {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef(null);
  
    useEffect(() => {
      if (inputValue === '') {
        setFilteredOptions(options);
      } else {
        setFilteredOptions(
          options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      }
    }, [inputValue, options]);
  
    function handleInputChange(event) {
      setInputValue(event.target.value);
    }
  
    function handleOptionClick(option) {
      setInputValue(option);
      setFilteredOptions([]);
    }
  
    function handleInputFocus() {
      setIsInputFocused(true);
    }
  
    function handleInputBlur() {
      setIsInputFocused(false);
    }
  
    function handleKeyDown(event) {
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault();
        if (filteredOptions.length > 0) {
          setInputValue(filteredOptions[0]);
        }
      }
    }

    return (
        <div className="autocomplete">
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ref={inputRef}
        />
        {isInputFocused && filteredOptions.length > 0 && (
            <div className="autocomplete-dropdown" style={{ top: inputRef.current.offsetHeight }}>
            <ul className="autocomplete-options">
                {filteredOptions.map((option) => (
                <li key={option} onClick={() => handleOptionClick(option)}>
                    {option}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
  );
}


export default InputDropDown;
