// import React, { useState, useEffect } from 'react';
// import { FiEdit, FiCheck, FiX } from 'react-icons/fi';

// const EditableInput = ({ userId, value, onSave, placeholder, type = "text", isTextArea = false }) => {
//     const [editMode, setEditMode] = useState(false);
//     const [inputValue, setInputValue] = useState(value);

//     useEffect(() => {
//         setInputValue(value);
//     }, [value]);

//     const handleEdit = () => {
//         setEditMode(true);
//     };

//     const handleSave = async () => {
//         if (inputValue !== value) {
//             await onSave(userId, inputValue);
//         }
//         setEditMode(false);
//     };

//     const handleCancel = () => {
//         setInputValue(value);
//         setEditMode(false);
//     };

//     const handleChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const inputField = isTextArea ? (
//         <textarea
//             className="form-textarea mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
//             value={inputValue}
//             onChange={handleChange}
//             placeholder={placeholder}
//         />
//     ) : (
//         <input
//             type={type}
//             className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
//             value={inputValue}
//             onChange={handleChange}
//             placeholder={placeholder}
//         />
//     );

//     return editMode ? (
//         <div>
//             {inputField}
//             <button onClick={handleSave} className="p-1 text-green-500 hover:text-green-600"><FiCheck /></button>
//             <button onClick={handleCancel} className="p-1 text-red-500 hover:text-red-600"><FiX /></button>
//         </div>
//     ) : (
//         <div className="flex items-center space-x-2">
//             <span className="text-lg font-medium text-white">{value || placeholder}</span>
//             <button onClick={handleEdit} className="p-1 text-blue-500 hover:text-blue-600"><FiEdit /></button>
//         </div>
//     );
// };

// export default EditableInput;
