import '../styles/Filters.css';
import { useRef, useState, useEffect, useCallback } from 'react';

function TextFilter( { onChange, placeholder, resetValues, resetDone } ) {
    const inputRef = useRef(null);
    const [value, setValue] = useState('');

    const resetDoneCallback = useCallback(() => {
        resetDone();
    }, [resetDone]);

    useEffect(() => {
        if (resetValues) {
          setValue('');
          resetDoneCallback();
        }
    }, [resetValues, resetDoneCallback]);


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
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
        const newValue = event.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    }

    return <input
                type="text" 
                className='text-filter'
                onKeyDown={handleKeyDown}
                ref={inputRef}
                value={value}
                placeholder={placeholder}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
            />;
}

export default TextFilter;