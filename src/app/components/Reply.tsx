// "use client";

import type { FormEvent } from "react";
import type { PComment } from "../api/comments/route";
import Button from "./Button";

interface ReplyProps {
  username: string;
  avatarImage: string;
  comment?: PComment;
}

const Reply: React.FC<ReplyProps> = ({ username, avatarImage, comment }) => {
  async function submitReply(e: any) {
    e.preventDefault();
    const formContent = e.target.elements.content.value;
    if (formContent.length <= 0) return;

    if (comment) {
      try {
        await fetch("http://localhost:3000/api/comments/addReply/", {
          method: "POST",
          body: JSON.stringify({
            attachedToCommendId: comment?.id,
            content: e.t,
          }),
        });
      } catch (error) {
        throw console.log(
          `Failed to submit reply to comment ${JSON.stringify(comment)} with the error ${error}.`
        );
      }
      return;
    }

    try {
      await fetch("http://localhost:3000/api/comments/addComment/", {
        method: "POST",
        body: JSON.stringify({
          content: formContent,
        }),
      });
    } catch (error) {
      throw console.log(
        `Failed to submit reply to comment ${JSON.stringify(comment)} with the error ${error}.`
      );
    }
  }

  return (
    <form
      method="POST"
      onSubmit={submitReply}
      className="flex w-full bg-white rounded-xl gap-4 p-6"
    >
      <img
        width={40}
        height={40}
        src={avatarImage}
        className="rounded-full h-fit"
        alt={`Image depicting ${username}'s user avatar.`}
      />
      <textarea
        name="content"
        className="w-full py-2 px-4 rounded-lg border-solid border-2 border-gray-200 outline-gray-400"
        placeholder="Add a comment..."
        rows={3}
      ></textarea>
      <Button type="submit">SEND</Button>
    </form>
  );
};

export default Reply;
