"use client";

import Button from "./Button";

const Reply: React.FC<{ username: string; avatarImage: string }> = ({
  username,
  avatarImage,
}) => {
  async function submitReply() {
    await fetch("http://localhost:3000/api/comments/addReply/", {
      method: "POST",
      body: JSON.stringify({ commentId: "2" }),
    }).finally(() => console.log("sa zicem ca mearsa"));
    console.log("sa zicem ca mearsax2");
  }

  return (
    <div className="flex w-full bg-white rounded-xl gap-4 p-6">
      <img
        width={40}
        height={40}
        src={avatarImage}
        className="rounded-full h-fit"
        alt={`Image depicting ${username}'s user avatar.`}
      />
      <textarea
        className="w-full py-2 px-4 rounded-lg border-solid border-2 border-gray-200 outline-gray-400"
        placeholder="Add a comment..."
        rows={3}
      ></textarea>
      <Button onClick={submitReply}>SEND</Button>
    </div>
  );
};

export default Reply;
