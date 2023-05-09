import { cookies } from "next/headers";
import { Comments } from "./Comments";
import { AllComments } from "./api/comments/route";

async function getComments() {
  const res = await fetch("http://localhost:3000/api/comments/");
  const comments = await res.json();
  return comments;
}

export default async function Home() {
  const comments: AllComments = await getComments();
  // const browserCookies = cookies();
  // const token = browserCookies.get("token");
  // console.log("COOOOOOOOOKIEEEEEEESSSSSSSSSS", browserCookies.getAll());
  return (
    <div className="w-full h-full">
      <div className="flex flex-col mt-20 gap-5 w-[800px] mx-auto">
        <Comments comments={comments} />
      </div>
    </div>
  );
}
