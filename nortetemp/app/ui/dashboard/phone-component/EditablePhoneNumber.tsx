// components/EditablePhoneNumber.tsx
"use client";

import React, { useState } from 'react';

interface EditablePhoneNumberProps {
  initialPhone: string;
}

const EditablePhoneNumber: React.FC<EditablePhoneNumberProps> = ({ initialPhone }) => {
  const [phone, setPhone] = useState(initialPhone);
  const [isEditing, setIsEditing] = useState(false);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-md w-64">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(00) 0 0000-0000"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-gray-700">{phone || "(00) 0 0000-0000"}</span>
          <button
            onClick={handleEditToggle}
            className="px-3 py-1 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default EditablePhoneNumber;
