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
  await fetch("http://localhost:3000/api/auth/identify/");
  const cookieStore = cookies();
  console.log(cookieStore.getAll());
  // return cookieStore.getAll().map((cookie) => (
  //   <div key={cookie.name}>
  //     <p>Name: {cookie.name}</p>
  //     <p>Value: {cookie.value}</p>
  //   </div>
  // ));
  return (
    <div className="w-full h-full">
      <div className="flex flex-col mt-20 gap-5 w-[800px] mx-auto">
        <Comments comments={comments} />
      </div>
    </div>
  );
}
