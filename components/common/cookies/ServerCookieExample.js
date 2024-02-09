// import React, { useState } from 'react';
//
// const ServerCookieExample = () => {
//     const [inputValue, setInputValue] = useState('');
//
//     const handleSetCookie = async () => {
//         const response = await fetch('/api/cookies', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ cookieToken: inputValue }),
//         });
//         const data = await response.json();
//         alert(data.message);
//         setInputValue('');
//     };
//
//     const handleGetCookie = async () => {
//         const response = await fetch('/api/cookies');
//         const data = await response.json();
//         alert(`Cookie value on server-side: ${data.cookieValue}`);
//     };
//
//     return (
//         <div>
//             <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder="Enter cookie value"
//             />
//             <button onClick={handleSetCookie}>Set Cookie (Server-side)</button>
//             <button onClick={handleGetCookie}>Get Cookie (Server-side)</button>
//         </div>
//     );
// };
//
// export default ServerCookieExample;
