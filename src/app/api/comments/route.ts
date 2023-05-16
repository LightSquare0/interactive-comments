import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { Prisma } from "@prisma/client";

export type FirstBatchOfComments = Prisma.PromiseReturnType<
  typeof getFirstBatchOfComments
>;

export type FirstBatchComment = FirstBatchOfComments[0];

const getFirstBatchOfComments = async () => {
  const firstBatchOfComments = await prisma.comment.findMany({
    select: {
      id: true,
      author: true,
      date: true,
      content: true,
      Replies: {
        include: { Replies: true },
      },
    },
  });

  return firstBatchOfComments;
};

export async function GET() {
  const firstBatchOfComments = await getFirstBatchOfComments();
  return NextResponse.json(firstBatchOfComments);
}
