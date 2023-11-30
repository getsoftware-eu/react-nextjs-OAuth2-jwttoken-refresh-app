import React, { useState } from 'react';
import  Cookies  from 'universal-cookie';

const cookies = new Cookies();

const CookieExample = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSetCookie = () => {
        cookies.set('cookieToken', inputValue, { path: '/' });
        setInputValue('');
    };

    const handleGetCookie = () => {
        const cookieValue = cookies.get('cookieToken');
        alert(`Cookie value: ${cookieValue}`);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter cookie value"
            />
            <button onClick={handleSetCookie}>Set Cookie</button>
            <button onClick={handleGetCookie}>Get Cookie</button>
        </div>
    );
};

export default CookieExample;
