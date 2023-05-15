import { cookies } from "next/headers";
import { cache } from "react";
import type { User, UserContext } from "./UserContext";

export const useUser = cache(async (): Promise<UserContext> => {
  const browserCookies = cookies();
  const token = browserCookies.get("token");
  if (token?.value == undefined || token?.value.length < 1) return null;

  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token?.value}` },
  });

  const githubUser = await githubUserResponse.json();

  const userObject: User = {
    id: githubUser.id,
    login: githubUser.login,
    avatar_url: githubUser.avatar_url,
    name: githubUser.name,
  };

  return userObject;
});
