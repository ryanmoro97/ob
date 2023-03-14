import React, { useState, useEffect, useRef } from 'react';
import '../styles/Filters.css';


function InputDropDown({ options, placeholder, onChange }) {
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
    if (onChange) {
      onChange(event.target.value);
    }
  }

  function handleOptionClick(option) {
    setInputValue(option);
    setIsInputFocused(false);
    if (onChange) {
      onChange(option);
    }
  }
  
  function handleInputBlur() {
    setTimeout(() => {
      setIsInputFocused(false);
      // setFilteredOptions([]);
    }, 100); 
  }

  function handleInputFocus() {
    setIsInputFocused(true);
    inputRef.current.select();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (filteredOptions.length > 0) {
        if(inputValue !== ''){
          setInputValue(filteredOptions[0]);
          if (onChange) {
            onChange(filteredOptions[0]);
          }
        }
      }
      setFilteredOptions([]);
      const currentTd = event.target.closest('td');
      const nextTd = currentTd.nextElementSibling;
      if (nextTd) {
        const nextInput = nextTd.querySelector('input');
        if (nextInput) {
          nextInput.focus();
          event.preventDefault(); // prevent the default behavior for Tab only
        }
      }
    }
  }

  return (
    <div className="autocomplete" >
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
