export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const result = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: JSON.stringify({
      client_id: "fa1888dfb1bd577bc2fe",
      client_secret: "ae61bb7e3f274a2cbbff4cd82466e5b4877fe7ad",
      code: code,
    }),
  });

  const authToken = await result.json();
  console.log(authToken);

  return new Response("Authenticated!", {
    status: 200,
    // headers: { 'Set-Cookie': `token=${token}` }
  });
}
