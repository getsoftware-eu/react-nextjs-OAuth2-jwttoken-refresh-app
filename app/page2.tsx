"use client";

import Button from "@elements/Button";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

import {signIn, signOut, useSession} from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState();
  const axiosAuth = useAxiosAuth();
  const fetchPost = async () => {
    const res = await axiosAuth.get("/api/v1/users/");
    setUsers(res.data);
  };
  return (
      <>
        {/*<div className="wrapper">*/}
        {/*<Header />*/}
        {/*  <SideNav />*/}
        <div className="main h-100 w-100">
          {/*<TopNav/>*/}
          <main className="container h-100">
            <div className="row h-100">
              <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                {/*<#nested />*/}
                <div className="d-table-cell align-middle">
                  <div className="text-center mt-4">
                    <p className="lead">
                      Struktura
                    </p>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="m-sm-4">

                        
                        
                        {/*<Button onClick={fetchPost}>Get User Posts</Button>*/}
                        {/*{users && JSON.stringify(users)}*/}
                        {session?.user ? (
                            <>
                              <div className="text-center">
                                {session.user.name}
                                {/*<img src="img/avatars/avatar.jpg" alt="Linda Miller" className="img-fluid rounded-circle"*/}
                                {/*     width="132" height="132"/>*/}
                              </div>
                              
                            <div className="text-center mt-3">

                              {/*<p className="text-sky-600"> {session.user.name}</p>*/}
                                <button className="btn btn-lg btn-primary" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}>
                                  Sign Out
                                </button>
                            </div>
                            </>
                        ) : (
                            <div className="text-center mt-3">

                              {/*<Link className="btn btn-lg btn-primary" href={"/login"}>Login</Link>*/}

                              <button className="btn btn-lg btn-primary" onClick={() => signIn()}>
                                Sign In
                              </button>
                              
                            </div>
                        )}
                        
                        {/*<div className="text-center">*/}
                        {/*  <img src="img/avatars/avatar.jpg" alt="Linda Miller" className="img-fluid rounded-circle"*/}
                        {/*       width="132" height="132"/>*/}
                        {/*</div>*/}
                        {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
                        {/*  <div className="mb-3">*/}
                        {/*    <label>Username</label>*/}
                        {/*    <input*/}
                        {/*        {...register("username", {*/}
                        {/*          required: "Please enter your username.",*/}
                        {/*        })}*/}
                        {/*        className="form-control form-control-lg"*/}
                        {/*        type="text" name="username"*/}
                        {/*        placeholder="Enter your username"*/}
                        {/*    />*/}
                        {/*    <p className="text-[#ed6172] font-semibold px-2 text-start">*/}
                        {/*      {errors.username?.message}*/}
                        {/*    </p>*/}
                        {/*    /!*<input className="form-control form-control-lg" type="email" name="email"*!/*/}
                        {/*    /!*       placeholder="Enter your email"/>*!/*/}
                        {/*  </div>*/}
                        {/*  <div className="mb-3">*/}
                        {/*    <label>Password</label>*/}
                        {/*    <input*/}
                        {/*        {...register("password", {*/}
                        {/*          required: "Please enter your password.",*/}
                        {/*        })}*/}
                        {/*        className="form-control form-control-lg"*/}
                        {/*        type="password" name="password"*/}
                        {/*        placeholder="Enter your password"*/}
                        {/*    />*/}
                        {/*    <p className="text-[#ed6172] font-semibold px-2 text-start">*/}
                        {/*      {errors.password?.message}*/}
                        {/*    </p>*/}
                        {/*    /!*<input className="form-control form-control-lg" type="password" name="password"*!/*/}
                        {/*    /!*       placeholder="Enter your password"/>*!/*/}
                        {/*    /!*<small>*!/*/}
                        {/*    /!*  <a href="pages-reset-password.html">Forgot password?</a>*!/*/}
                        {/*    /!*</small>*!/*/}
                        {/*  </div>*/}
                        {/*  <div>*/}
                        {/*    /!*<div className="form-check align-items-center">*!/*/}
                        {/*    /!*  <input id="customControlInline" type="checkbox" className="form-check-input"*!/*/}
                        {/*    /!*         value="remember-me" name="remember-me"*!/*/}
                        {/*    /!*         checked>*!/*/}
                        {/*    /!*    <label className="form-check-label text-small" htmlFor="customControlInline">Remember*!/*/}
                        {/*    /!*      me next time</label>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*  </div>*/}
                        {/*  <div className="text-center mt-3">*/}
                        {/*    <button className="btn btn-lg btn-primary" type="submit">*/}
                        {/*      Login*/}
                        {/*    </button>*/}
                        {/*    /!*<a href="dashboard-default.html" className="btn btn-lg btn-primary">Sign in</a>*!/*/}
                        {/*    /!*  <!-- <button type="submit" className="btn btn-lg btn-primary">Sign in</button> -->*!/*/}
                        {/*  </div>*/}
                        {/*</form>*/}
                        {/*<ServerCookieExample />*/}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/*<@footer />*/}
          {/*<FooterNav />*/}
        </div>
        {/*</div>*/}
      </>
  );
};

export default HomePage;
