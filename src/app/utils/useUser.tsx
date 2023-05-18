import { cookies } from "next/headers";
import { cache } from "react";
import type { User, UserContext } from "./UserContext";

export const useUser = cache(async (authToken?: string): Promise<UserContext> => {
  let token;
  if (authToken) {
    token = authToken;
  } else {
    const browserCookies = cookies();
    token = browserCookies.get("token")?.value;
  }
  if (token == undefined || token.length < 1) return null;

  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!githubUserResponse.ok) return null;

  const githubUser = await githubUserResponse.json();

  const userObject: User = {
    id: githubUser.id,
    login: githubUser.login,
    avatar_url: githubUser.avatar_url,
    name: githubUser.name,
  };

  return userObject;
});
