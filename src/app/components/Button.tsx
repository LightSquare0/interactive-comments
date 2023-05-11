"use client";

import type { ReactNode } from "react";

const Button: React.FC<{ children: ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  return (
    <button className="bg-blue-moderate text-white h-fit py-4 px-3 rounded-md">{children}</button>
  );
};

export default Button;
