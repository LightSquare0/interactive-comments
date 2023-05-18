"use client";

import Image from "next/image";
import { type Dispatch, useReducer, useContext, useState } from "react";
import { UserContext } from "../utils/UserContext";
import Reply from "./Reply";
import type { PComment } from "../api/comments/route";

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

const Avatar: React.FC<{
  avatarImage: string;
  username: string;
  date: Date;
}> = ({ avatarImage, username, date }) => {
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
      <span className="text-blue-grayish">
        {date ? date.toString() : "invalid date"}
      </span>
    </div>
  );
};

function reducer(
  state: { votes: number; voted: boolean },
  action: { type: string }
) {
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
export const Comment: React.FC<{ comment: PComment; styles?: string }> = ({
  comment,
  styles,
}) => {
  const [state, dispatch] = useReducer(reducer, { votes: 0, voted: false });
  const [displayReply, setDisplayReplay] = useState(false);

  const user = useContext(UserContext);

  function handleReplyButton() {
    if (!user)
      return (window.location.href =
        "https://github.com/login/oauth/authorize?client_id=fa1888dfb1bd577bc2fe");

    setDisplayReplay(!displayReply);
  }

  return (
    <div
      className={`flex flex-col ${
        (comment.Replies && comment.Replies.length > 0) || displayReply
          ? "gap-5"
          : ""
      } w-full`}
    >
      <div className={`flex w-full gap-6 rounded-xl p-6 bg-white`}>
        <Voter votes={state.votes} dispatch={dispatch} />
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full items-center justify-between">
            <Avatar
              avatarImage={comment.author.avatarImage}
              username={comment.author.username}
              date={comment.date}
            />
            <button
              onClick={handleReplyButton}
              className="flex items-center gap-2 text-blue-moderate"
            >
              <Image
                width={14}
                height={14}
                src="/icon-reply.svg"
                alt="Reply icon"
              />
              Reply
            </button>
          </div>
          <div className="text-blue-grayish">{comment.content}</div>
        </div>
      </div>
      <div className="flex flex-col">
        {displayReply && user && (
          <div className="flex">
            <div className="border mx-8 border-gray-200"></div>
            <Reply
              comment={comment}
              avatarImage={user?.avatar_url}
              username={user?.name}
            />
          </div>
        )}
        {comment.Replies && (
          <div className="flex w-full">
            <div className="border mx-8 border-gray-200"></div>
            {comment.Replies.map((reply) => (
              <Comment key={comment.id} styles="mb-5" comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
