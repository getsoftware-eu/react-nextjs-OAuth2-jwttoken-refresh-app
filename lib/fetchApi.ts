import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
async function refreshToken(refreshTokenString: string) {
  const res = await fetch(BASE_URL + "/api/v1/auth/refresh/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refresh: refreshTokenString,
    }),
  });
  const data = await res.json();
  console.log({ data });

  return data.accessToken;
}

/**
 * central SERVER Auth fetch Method
 * Usage only via client-hook!!!
 * @param url
 * @constructor
 */
export async function AuthGetApi(url: string) {
  const session = await getServerSession(authOptions);
  console.log("before refresh: session?.user.accessToken=", session?.user.accessToken);

  console.log("before fetch: " + BASE_URL + url);
  let res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Authorization: `bearer ${session?.user.accessToken}`,
    },
  });

  if (res.status == 401) {
    console.log("res.status == 401");
    if (session) session.user.accessToken = await refreshToken(session?.user.refreshToken ?? "");
    console.log("after 401 refresh: session?.user.accessToken=", session?.user.accessToken);

    console.log("before 401 fetch: " + BASE_URL + url);
    res = await fetch(BASE_URL + url, {
      method: "GET",
      headers: {
        Authorization: `bearer ${session?.user.accessToken}`,
      },
    });
    const result = await res.json();
    console.log("after fetch: " + BASE_URL + url + ": " + result);
    return result;
  }

  return await res.json();
}
