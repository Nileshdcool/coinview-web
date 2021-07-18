import React from 'react';

const Input = (props) => {
    const {htmlFor,label,id,value,handleInputChange,name} = props.attributes;
    return (
        <div className="form-group">
            <label htmlFor={htmlFor}>{label}</label>
            <input
                type="text"
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={handleInputChange}
            />
        </div>
    )
}
export default Input;