import { prisma } from "@/app/utils/prisma";

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req.commentId);

  await prisma.comment.create({
    data: {
      author: { connect: { id: 1 } },
      attachedToComment: { connect: { id: parseInt(req.commentId) } },
      content: "Ce pot spune",
    },
  });

  return new Response("Reply submitted!", {
    status: 200,
  });
}
