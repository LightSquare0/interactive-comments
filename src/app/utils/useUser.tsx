import { cookies } from "next/headers";

export const useUser = async () => {
  const browserCookies = cookies();
  const token = browserCookies.get("token");
  // console.log("COOOOOOOOOKIEEEEEEESSSSSSSSSS", browserCookies.getAll());
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

  console.log(token);

  return userObject;
};
