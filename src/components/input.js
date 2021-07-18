import React from 'react';

const Input = (props) => {
    return (
        <div className="form-group">
            <label htmlFor="name">Title</label>
            <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentAsset.name}
                onChange={handleInputChange}
            />
        </div>
    )
}
export default Input;