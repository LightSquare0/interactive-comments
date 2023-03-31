"use client";

import Image from "next/image";
import { type Dispatch, useReducer } from "react";

interface Voter {
  votes: number;
  dispatch: Dispatch<{
    type: string;
  }>;
}

const Voter: React.FC<Voter> = ({ votes, dispatch }) => {
  return (
    <div className="flex flex-col items-center min-w-[2.5rem] w-fit px-3 py-2 gap-3 rounded-xl bg-gray-very-light ">
      <button
        className="text-blue-grayish-light"
        onClick={() => dispatch({ type: "increment_vote" })}
      >
        +
      </button>
      <div className="text-blue-moderate">{votes}</div>
      <button
        className="text-blue-grayish-light"
        onClick={() => dispatch({ type: "decrement_vote" })}
      >
        -
      </button>
    </div>
  );
};

function reducer(state: { votes: number }, action: { type: string }) {
  if (action.type === "increment_vote") {
    return {
      votes: state.votes + 1,
    };
  }
  if (action.type === "decrement_vote") {
    return {
      votes: state.votes + 1,
    };
  }
  throw Error("Unknown action.");
}

const Avatar: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Image
        width={32}
        height={32}
        src="/image-amyrobson.png"
        alt={"Image depicting user Amy Robson's avatar."}
      />
      <span className="text-blue-dark">Amy Robson</span>
      <span className="text-blue-grayish">1 month ago</span>
    </div>
  );
};

export const Comment: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { votes: 0 });

  return (
    <div className="flex w-full gap-6 rounded-xl p-6 bg-white">
      <Voter votes={state.votes} dispatch={dispatch} />
      <div className="flex flex-col w-full gap-4">
        <div className="flex w-full items-center justify-between">
          <Avatar />
          <button className="flex items-center gap-2 text-blue-moderate"><Image width={14} height={14} src="/icon-reply.svg" alt="Reply icon"/> Reply</button>
        </div>
        <div className="text-blue-grayish">ajsdnasjdasjdnasjndasjkndjkn</div>
      </div>
    </div>
  );
};
