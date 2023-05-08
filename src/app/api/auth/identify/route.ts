import { cookies } from "next/headers";

export async function GET(request: Request) {
  
  return new Response("Testing", {
    status: 200,
    headers: {
      "Set-Cookie": "samper=false",
    },
  });
}
