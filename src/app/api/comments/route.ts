import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export interface NComment {
  id: number;
  content: string;
  date: Date;
  author: { id: number; username: string; avatarImage: string };
}

export type AllComments = NComment[];
const prisma = new PrismaClient();
export async function GET() {
  // const allComments = await db
  //   .select({
  //     id: comments.id,
  //     content: comments.content,
  //     date: comments.date,
  //     author: {
  //       id: users.id,
  //       username: users.username,
  //       avatarImage: users.avatarImage,
  //     },
  //   })
  //   .from(comments)
  //   .leftJoin(users, eq(comments.authorId, users.id));

  const allComments = await prisma.comment.findMany({
    select: {
      id: true,
      author: { select: { id: true, username: true, avatarImage: true } },
      date: true,
      content: true,
    },
  });

  return NextResponse.json(allComments);
}
