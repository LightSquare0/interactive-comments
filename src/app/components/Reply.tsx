// "use client";

import type { FormEvent } from "react";
import type { PComment } from "../api/comments/route";
import Button from "./Button";

interface ReplyProps {
  username: string;
  avatarImage: string;
  comment?: PComment;
  onSubmit: (e: any) => Promise<void>;
}

const Reply: React.FC<ReplyProps> = ({
  username,
  avatarImage,
  comment,
  onSubmit,
}) => {
  return (
    <form
      method="POST"
      onSubmit={onSubmit}
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
