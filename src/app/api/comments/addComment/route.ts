import { prisma } from "@/app/utils/prisma";
import { useUser } from "@/app/utils/useUser";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const req = await request.json();

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await useUser(token?.value);

  if (!user)
    return new Response("Couldn't retrieve github user data.", {
      status: 403,
    });

  console.log(req);

  await prisma.comment.create({
    data: {
      author: { connect: { githubId: user.id } },
      content: req.content,
    },
  });

  return new Response("Reply submitted!", {
    status: 200,
  });
}
