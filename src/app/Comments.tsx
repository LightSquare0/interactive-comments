"use client";

import { useContext } from "react";
import { Comment } from "./components/Comment";
import Reply from "./components/Reply";
import { UserContext } from "./utils/UserContext";
import Button from "./components/Button";
import type { PComments } from "./api/comments/route";

interface CommentsProps {
  comments: PComments;
}

export function Comments({ comments }: CommentsProps) {
  const user = useContext(UserContext);

  async function submitComment(e: any) {
    e.preventDefault();
    const formContent = e.target.elements.content.value;
    if (formContent.length <= 0) return;

    try {
      await fetch("http://localhost:3000/api/comments/addComment/", {
        method: "POST",
        body: JSON.stringify({
          content: formContent,
        }),
      });
    } catch (error) {
      throw console.log(
        `Failed to add a new comment 
        )} with the error ${error}.`
      );
    }
  }

  return (
    <div className="flex flex-col gap-5 py-14 w-[800px] mx-auto">
      <div className="flex justify-end">
        {user ? (
          <Reply
            onSubmit={submitComment}
            avatarImage={user.avatar_url}
            username={user.name}
          />
        ) : (
          <a href="https://github.com/login/oauth/authorize?client_id=fa1888dfb1bd577bc2fe">
            <Button>Add new comment</Button>
          </a>
        )}
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
