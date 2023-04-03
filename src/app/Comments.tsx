"use client";

import { type AllComments } from "./api/comments/route";
import { Comment } from "./components/Comment";

interface CommentsProps {
  comments: AllComments;
}

export function Comments({ comments }: CommentsProps) {
  return (
    <>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </>
  );
}
