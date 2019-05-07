import React from 'react';
import ReactDOM from 'react-dom';

const UploadExcelButton = () => {
    return (
        <div>
            <label htmlFor="avatar">Choose a profile picture:</label>

            <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg"/>

        </div>
    );
};

export default UploadExcelButton;