"use client";
import { axiosAuth } from "lib/axios";
import {signOut, useSession} from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

/**
 * central CLIENT(!!!) fetch usage:
 * axiosAuth.get(path...)
 * axiosAuth.post(path...)
 */
const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        return config;
      },
      (error) => 
          Promise.reject(error)
    );

      const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => {

          if(response && response.data && (typeof response.data === 'string' || response.data instanceof String) && response.data.startsWith("<!DOCTYPE html>"))
          {
              response.status = 401;
              signoutForceFromIntersepter();
          }
          
          return response
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log("error?.response?.status === 401 ");
          prevRequest.sent = true;
          await refreshToken();
            console.log("setting new accesToken nach 401: " + session?.user.accessToken);
            prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

      function signoutForceFromIntersepter() {
          const refreshToken = {
              refresh: session?.user?.refreshToken,
              username: session?.user?.name,
              email: session?.user?.email,
          };

          if (refreshToken.email) {
              // const result = this.axiosInstance.post("/api/v1/auth/logout",
              //     refreshToken
              // );
          }


          if (session && session.user.accessToken)
              session.user.accessToken = "";

          // this.session = null;
          // redirect('/logout');
          // push('/logout');

          // dispatch(remove());
          // serverLogout();
          signOut().then();
          // router.push("/login");
          {
              window.location.href = '/logout'
          }
          /** Intercept any unauthorized request.
           * dispatch logout action accordingly **/
          // const UNAUTHORIZED = 401;
          // // const {dispatch} = reduxStore; // direct access to redux store.
          // axios.interceptors.response.use(
          //     response => response,
          //     error => {
          //       const {status} = error.response;
          //       if (status === UNAUTHORIZED) {
          //         dispatch(remove());
          //       }
          //       return Promise.reject(error);
          //     }
          // );
          //
          // render(router, document.getElementById('app-root'));
      }  

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
