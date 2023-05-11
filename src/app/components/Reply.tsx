"use client";

import Button from "./Button";

const Reply: React.FC<{ username: string; avatarImage: string }> = ({ username, avatarImage }) => {
  return (
    <div className="flex w-full bg-white rounded-xl gap-3 p-6">
      <img
        width={40}
        height={40}
        src={avatarImage}
        className="rounded-full h-fit"
        alt={`Image depicting ${username}'s user avatar.`}
      />
      {/* <input className="w-full h-24" type="text" /> */}
      <textarea className="w-full" rows={5}></textarea>
      <Button onClick={() => console.log("samper")}>SUBMIT</Button>
    </div>
  );
};

export default Reply;
