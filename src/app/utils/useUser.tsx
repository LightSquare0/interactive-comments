import { cookies } from "next/headers";
import { cache } from "react";

export const useUser = cache(async () => {
  const browserCookies = cookies();
  const token = browserCookies.get("token");
  if (token?.value == undefined || token?.value.length < 1) return {};

  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token?.value}` },
  });

  const githubUser = await githubUserResponse.json();

  const userObject = {
    id: githubUser.id,
    login: githubUser.login,
    avatar_url: githubUser.avatar_url,
    name: githubUser.name,
  };

  return userObject;
});
