import { Comments } from "./Comments";
import type { PComments } from "./api/comments/route";
import { useUser } from "./utils/useUser";

export async function getComments() {
  const res = await fetch("http://localhost:3000/api/comments/");
  const comments = await res.json();
  return comments;
}

export default async function Home() {
  const user = await useUser();
  const comments: PComments = await getComments();

  return (
    <div className="w-full h-full">
      <div className="flex flex-col py-14 gap-5 w-[800px] mx-auto">
        <Comments comments={comments} />
      </div>
    </div>
  );
}
