import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code)
    return new Response("Please provide a github oauth code", {
      status: 400,
    });

  let data = new FormData();
  data.append("client_id", "fa1888dfb1bd577bc2fe");
  data.append("client_secret", "ae61bb7e3f274a2cbbff4cd82466e5b4877fe7ad");
  data.append("code", code);
  console.log(code);

  const result = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: data,
  });

  if (!result.ok)
    return new Response("Couldn't POST github endpoint.", {
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

  return new Response("Authenticated!", {
    status: 200,
    headers: headers,
  });
}
