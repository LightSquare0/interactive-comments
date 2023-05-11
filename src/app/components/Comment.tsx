"use client";

import Image from "next/image";
import { type Dispatch, useReducer } from "react";
import { type NComment } from "../api/comments/route";

interface Voter {
  votes: number;
  dispatch: Dispatch<{
    type: string;
  }>;
}

const Voter: React.FC<Voter> = ({ votes, dispatch }) => {
  return (
    <div className="flex flex-col items-center min-w-[2.5rem] w-fit px-3 py-2 gap-3 rounded-xl bg-gray-very-light">
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

const Avatar: React.FC<{ avatarImage: string; username: string; date: Date }> = ({
  avatarImage,
  username,
  date,
}) => {
  return (
    <div className="flex items-center gap-4">
      <img
        width={32}
        height={32}
        src={avatarImage}
        className="rounded-full"
        alt={`Image depicting ${username}'s user avatar.`}
      />
      <span className="text-blue-dark">{username}</span>
      <span className="text-blue-grayish">{date ? date.toString() : "invalid date"}</span>
    </div>
  );
};

function reducer(state: { votes: number; voted: boolean }, action: { type: string }) {
  if (action.type === "increment_vote") {
    return {
      votes: state.votes + 1,
      voted: state.voted,
    };
  }
  if (action.type === "decrement_vote") {
    return {
      votes: state.votes + 1,
      voted: state.voted,
    };
  }
  throw Error("Unknown action.");
}
export const Comment: React.FC<{ comment: NComment }> = ({ comment }) => {
  const [state, dispatch] = useReducer(reducer, { votes: 0, voted: false });

  return (
    <div className="flex w-full gap-6 rounded-xl p-6 bg-white">
      <Voter votes={state.votes} dispatch={dispatch} />
      <div className="flex flex-col w-full gap-4">
        <div className="flex w-full items-center justify-between">
          <Avatar
            avatarImage={comment.author.avatarImage}
            username={comment.author.username}
            date={comment.date}
          />
          <button className="flex items-center gap-2 text-blue-moderate">
            <Image width={14} height={14} src="/icon-reply.svg" alt="Reply icon" />
            Reply
          </button>
        </div>
        <div className="text-blue-grayish">{comment.content}</div>
      </div>
    </div>
  );
};
