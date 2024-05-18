import React from 'react';

const CustomForm = ({ fields, onSubmit, onChange, submitLabel }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <input
                    key={field.name}
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    className={field.className}
                />
            ))}
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3">
                {submitLabel}
            </button>
        </form>
    );
};

export default CustomForm;
