import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { Comment, User } from "@prisma/client";

// export type FirstBatchOfComments = Prisma.PromiseReturnType<
//   typeof getFirstBatchOfComments
// >;

// export type FirstBatchComment = FirstBatchOfComments[0];

export type PComment = Comment & {
  author: User;
  Replies: PComments;
};

export type PComments = PComment[];

const getFirstBatchOfComments = async () => {
  const firstBatchOfComments = await prisma.comment.findMany({
    include: {
      author: true,
      Replies: {
        include: { author: true, Replies: { include: { author: true } } },
      },
    },
    where: {
      attachedToCommentId: -1,
    },
  });

  return firstBatchOfComments;
};

export async function GET() {
  const firstBatchOfComments = await getFirstBatchOfComments();
  return NextResponse.json(firstBatchOfComments);
}
