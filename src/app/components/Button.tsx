"use client";

import type { ReactNode } from "react";

const Button: React.FC<{ children: ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  return (
    <button className="bg-blue-moderate text-white h-fit py-2 px-4 rounded-md">{children}</button>
  );
};

export default Button;
