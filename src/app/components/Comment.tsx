"use client";

import { useState } from "react";

interface Voter {
  score: number;
  onClick: () => void;
}

const Voter: React.FC<Voter> = ({ score, onClick }) => {
  return (
    <div className="flex flex-col items-center w-fit px-3 py-2 gap-3 rounded-xl bg-gray-very-light ">
      <button className="text-blue-grayish-light">+</button>
      <div className="text-blue-moderate">12</div>
      <button className="text-blue-grayish-light">-</button>
    </div>
  );
};

export const Comment: React.FC = () => {
  const [score, setScore] = useState();

  return (
    <div className="rounded-xl p-6 bg-white">
      <Voter />
    </div>
  );
};
