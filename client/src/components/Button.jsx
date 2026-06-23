import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      className="bg-[#0181FF] text-white px-8 sm:px-16 py-3 rounded-md shadow-md hover:bg-[#0167CC] active:scale-95 transition-transform text-md font-medium"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
