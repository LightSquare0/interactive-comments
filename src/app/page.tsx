import Image from "next/image";
import { Comment } from "./components/Comment";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col mt-20 gap-5 w-[800px] mx-auto">
        {Array.from({ length: 15 }).map(() => (
          <Comment />
        ))}
      </div>
    </div>
  );
}
