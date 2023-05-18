"use client";

import type { ReactNode } from "react";

const Button: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}> = ({ children, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-moderate text-white h-fit py-2 px-4 rounded-md"
    >
      {children}
    </button>
  );
};

export default Button;
