import { eq } from "drizzle-orm/expressions";
import { db } from "@/db/db";
import { comments, users } from "@/db/schema";
import { NextResponse } from "next/server";

export interface NComment {
  id: number;
  content: string;
  date: Date;
  author: { id: number; username: string; avatarImage: string };
}

export type AllComments = NComment[];

export async function GET() {
  const allComments = await db
    .select({
      id: comments.id,
      content: comments.content,
      date: comments.date,
      author: {
        id: users.id,
        username: users.username,
        avatarImage: users.avatarImage,
      },
    })
    .from(comments)
    .leftJoin(users, eq(comments.authorId, users.id));
  return NextResponse.json(allComments);
}
