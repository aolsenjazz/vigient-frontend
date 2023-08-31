import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
