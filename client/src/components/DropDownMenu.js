import React, { useState } from 'react';
import '../styles/QueryButtons.css';

function DropdownMenu({ options, className, onChange }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    const selected = options.find(option => option.value === event.target.value);
    setSelectedOption(selected);
    onChange(selected);
  };
  

  return (
    <div>
      <select className = "select" value={selectedOption.value} onChange={handleChange}>
        {options.map((option) => (
          <option className = "select-options" key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownMenu;