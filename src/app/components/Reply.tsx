"use client";

import Button from "./Button";

const Reply: React.FC<{ username: string; avatarImage: string }> = ({
  username,
  avatarImage,
}) => {
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
      <Button onClick={() => console.log("samper")}>SEND</Button>
    </div>
  );
};

export default Reply;
