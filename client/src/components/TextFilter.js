import '../styles/Filters.css';
import { useRef } from 'react';

function InputText( {onChange} ) {
    const inputRef = useRef(null);

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            const currentTd = event.target.closest('td');
            const nextTd = currentTd.nextElementSibling;
            if (nextTd) {
            const nextInput = nextTd.querySelector('input');
                if (nextInput) {
                    nextInput.focus();
                    event.preventDefault(); 
                }
            }
        }
    }

    function handleInputFocus() {
        inputRef.current.select();
    }

    function handleInputChange(event) {
        if (onChange) {
            onChange(event.target.value);
        }
    }

    return <input
                type="text" 
                className='text-filter'
                onKeyDown={handleKeyDown}
                ref={inputRef}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
            />;
}

export default InputText;