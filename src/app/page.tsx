import Image from "next/image";
import { Comment } from "./components/Comment";
import { db } from "../db/db";
import { comments } from "@/db/schema";

async function getComments() {
  const comments = await fetch("http://localhost:3000/api/comments");
  return comments.json();
}

export default async function Home() {
  const comments = await getComments();
  return (
    <div className="w-full h-full">
      <div className="flex flex-col mt-20 gap-5 w-[800px] mx-auto">
        {comments.map(() => (
          <Comment />
        ))}
      </div>
    </div>
  );
}
