import { prisma } from "@/app/utils/prisma";
import { useUser } from "@/app/utils/useUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code)
    return new Response("Please provide a github oauth code", {
      status: 400,
    });

  if (!(process.env.CLIENT_ID && process.env.CLIENT_SECRET))
    return new Response("Couldn't POST github endpoint. #1");
  let data = new FormData();
  data.append("client_id", process.env.CLIENT_ID);
  data.append("client_secret", process.env.CLIENT_SECRET);
  data.append("code", code);
  console.log(code);

  const result = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: data,
  });

  if (!result.ok)
    return new Response("Couldn't POST github endpoint. 2#", {
      status: 400,
    });
  const response = await result.text();
  const urlSearchParams = new URLSearchParams(response);
  const authToken = urlSearchParams.get("access_token");

  if (!authToken)
    return new Response("Couldn't retrieve github oauth token.", {
      status: 400,
    });
  let headers = new Headers();
  headers.set(
    "Set-Cookie",
    `token=${authToken};expires=${new Date(
      new Date().setTime(new Date().getTime() + 2629800000)
    )};samesite=lax;path=/`
  );

  const userData = await useUser(authToken);

  if (!userData)
    return new Response("Couldn't get github user data", {
      status: 403,
    });

  //Create user in the database if they don't exit yet.
  const userDb = await prisma.user.findUnique({
    where: {
      githubId: userData?.id,
    },
  });

  if (!userDb) {
    await prisma.user.create({
      data: {
        githubId: userData.id,
        username: userData?.login,
        avatarImage: userData.avatar_url,
      },
    });
  }

  return new Response("Authenticated!", {
    status: 200,
    headers: headers,
  });
}
