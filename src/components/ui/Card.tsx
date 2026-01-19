import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export default function Card({ children, onClick, selected, className = '' }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white border-2 rounded-lg p-6 shadow-md transition-all
        ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''}
        ${selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
