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
  const [commentState, setCommentState] = useState(comment);
  const [displayReply, setDisplayReply] = useState(false);
  const user = useContext(UserContext);

  function handleReplyButton() {
    if (!user)
      return (window.location.href =
        "https://github.com/login/oauth/authorize?client_id=fa1888dfb1bd577bc2fe");

    setDisplayReply(!displayReply);
  }

  async function onSubmitReply(e: any) {
    e.preventDefault();

    if (!user) return;

    const formContent = e.target.elements.content.value;
    if (formContent.length <= 0) return;

    let replyId = comment.Replies.length
      ? commentState.Replies[comment.Replies.length - 1].id
      : 0;
    console.log(replyId);
    setCommentState({
      ...commentState,
      Replies: [
        {
          id: replyId,
          author: {
            username: user?.name,
            avatarImage: user.avatar_url,
            githubId: user.id,
            id: user.id,
          },
          authorId: user.id,
          attachedToCommentId: commentState.id,
          content: formContent,
          date: new Date().toISOString(),
        },
        ...commentState.Replies,
      ],
    });
    setDisplayReply(false);
    // TODO: Inform user if comment posting fails
    try {
      await fetch("http://localhost:3000/api/comments/addReply/", {
        method: "POST",
        body: JSON.stringify({
          attachedToCommentId: comment?.id,
          content: formContent,
        }),
      });
    } catch (error) {
      throw console.log(
        `Failed to submit reply to comment ${JSON.stringify(
          comment
        )} with the error ${error}.`
      );
    }
  }

  return (
    <div
      className={`flex flex-col ${
        (commentState.Replies && commentState.Replies.length > 0) ||
        displayReply
          ? "gap-5"
          : ""
      } w-full`}
    >
      <div className={`flex w-full gap-6 rounded-xl p-6 bg-white`}>
        <Voter votes={state.votes} dispatch={dispatch} />
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full items-center justify-between">
            <Avatar
              avatarImage={commentState.author.avatarImage}
              username={commentState.author.username}
              date={commentState.date}
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
          <div className="text-blue-grayish">{commentState.content}</div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {displayReply && user && (
          <div className="flex">
            <div className="border mx-8 border-gray-200"></div>
            <Reply
              comment={commentState}
              onSubmit={onSubmitReply}
              avatarImage={user?.avatar_url}
              username={user?.name}
            />
          </div>
        )}
        {commentState.Replies && (
          <div className="flex w-full">
            <div className="border mx-8 border-gray-200"></div>
            <div className="flex flex-col gap-5 w-full">
              {commentState.Replies.map((reply) => (
                <Comment styles="mb-5" key={reply.id} comment={reply} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
