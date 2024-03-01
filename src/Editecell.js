import React, { useState } from 'react';

const EditableCell = ({ value, editing, onChange }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        onChange(inputValue);
    };

    return (
        <td>
            {editing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : (
                value
            )}
        </td>
    );
};

export default EditableCell;
