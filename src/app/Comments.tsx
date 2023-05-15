"use client";

import { useContext } from "react";
import { type AllComments } from "./api/comments/route";
import { Comment } from "./components/Comment";
import Reply from "./components/Reply";
import { UserContext } from "./utils/UserContext";
import Button from "./components/Button";

interface CommentsProps {
  comments: AllComments;
}

export function Comments({ comments }: CommentsProps) {
  const user = useContext(UserContext);

  return (
    <>
      <div className="flex justify-end">
        {user ? (
          <Reply avatarImage={user.avatar_url} username={user.name} />
        ) : (
          <a href="https://github.com/login/oauth/authorize?client_id=fa1888dfb1bd577bc2fe">
            <Button>Add new comment</Button>
          </a>
        )}
      </div>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </>
  );
}
