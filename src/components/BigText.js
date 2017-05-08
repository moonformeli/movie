import React from 'react';
import '../../public/styles/BigText.css';

const BigText = ({children}) => {
    return (
        <div className="big-text">
            {children}
        </div>
    );
};

export default BigText; 