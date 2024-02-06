// "use client";
//
// import axios from "lib/axios";
// import {signIn, signOut, useSession} from "next-auth/react";
//
// export const useInitData = () => {
//   const { data: session } = useSession();
//
//   const initData = async () => {
//
//     // const refreshTokenDTO = {
//     //   refreshToken: session?.user.refreshToken ?? "",
//     //   username: session?.user?.userName,
//     //   email: session?.user?.email,
//     // };
//    
//     const res = await axios.post("/auth/refresh", {
//       refresh: session?.user.refreshToken,
//     });
//
//     if (session) {
//
//       //Anomal Html-Reject from server
//       if(res && res.data && (typeof res.data === 'string' || res.data instanceof String) && res.data.startsWith("<!DOCTYPE html>"))
//       {
//         res.status = 401;
//         res.statusText = "Jwt problem";
//         signOut({ callbackUrl: 'http://localhost:3000/login' }).then();
//       }
//       else{
//         console.log("persist new accessToken:" + res.data.accessToken)
//         session.user.accessToken = res.data.accessToken;
//         // session.user.refreshToken = res.data.refreshToken;
//       }
// 
//     }
//    
//     else signIn();
//   };
//   return refreshToken;
// };
