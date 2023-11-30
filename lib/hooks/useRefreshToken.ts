"use client";

import axios from "lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {

    // const refreshTokenDTO = {
    //   refreshToken: session?.user.refreshToken ?? "",
    //   username: session?.user?.userName,
    //   email: session?.user?.email,
    // };
    
    const res = await axios.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });

    if (session) {
      console.log("persist new accessToken:" + res.data.accessToken)
      session.user.accessToken = res.data.accessToken;
      // session.user.refreshToken = res.data.refreshToken;
    }
    
    else signIn();
  };
  return refreshToken;
};
