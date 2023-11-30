"use client"
import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
// import { Toaster } from "react-hot-toast";
// import {remove} from "/redux/userSlice";
// import {LogoutIcon} from "@heroicons/react/outline";
// import {useDispatch} from "react-redux";
// import CookieExample from '../components/common/cookies/CookieExample';
// import ServerCookieExample from '../components/common/cookies/ServerCookieExample';

function Login() {

  const { data: session, status } = useSession()
  // const dispatch = useDispatch();

  if (session && status === "authenticated") {
    window.location.href = "http://localhost:3000/asset/informationSa/list"
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await signIn("credentials", {
      username: data.username, //TODO Username
      password: data.password,
      redirect: true,
      callbackUrl: "/asset/informationSa/list"
    })
  };

 

    if (session && status === "authenticated") {
    return (
        <>
          Signed in as {session.user.username} <br />

          <p
              className="btn btn-danger"
              onClick={() => {
                // dispatch(remove());
                // serverLogout();
                signOut({callbackUrl: 'http://localhost:3000/'});
                logout();
              }}
          >
            {/*<LogoutIcon className="w-5 h-5" />*/}
            <span>Logout</span>
          </p>
          
          {/*<button onClick={() => signOut()}>Sign out</button>*/}
        </>
    )
  }


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
                      Sign in to your account to continue
                    </p>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="m-sm-4">
                        {/*<div className="text-center">*/}
                        {/*  <img src="img/avatars/avatar.jpg" alt="Linda Miller" className="img-fluid rounded-circle"*/}
                        {/*       width="132" height="132"/>*/}
                        {/*</div>*/}
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-3">
                            <label>Username</label>
                            <input
                                {...register("username", {
                                  required: "Please enter your username.",
                                })}
                                className="form-control form-control-lg"
                                type="text" name="username"
                                placeholder="Enter your username"
                            />
                            <p className="text-[#ed6172] font-semibold px-2 text-start">
                              {errors.username?.message}
                            </p>
                            {/*<input className="form-control form-control-lg" type="email" name="email"*/}
                            {/*       placeholder="Enter your email"/>*/}
                          </div>
                          <div className="mb-3">
                            <label>Password</label>
                            <input
                                {...register("password", {
                                  required: "Please enter your password.",
                                })}
                                className="form-control form-control-lg"
                                type="password" name="password"
                                placeholder="Enter your password"
                            />
                            <p className="text-[#ed6172] font-semibold px-2 text-start">
                              {errors.password?.message}
                            </p>
                            {/*<input className="form-control form-control-lg" type="password" name="password"*/}
                            {/*       placeholder="Enter your password"/>*/}
                            {/*<small>*/}
                            {/*  <a href="pages-reset-password.html">Forgot password?</a>*/}
                            {/*</small>*/}
                          </div>
                          <div>
                            {/*<div className="form-check align-items-center">*/}
                            {/*  <input id="customControlInline" type="checkbox" className="form-check-input"*/}
                            {/*         value="remember-me" name="remember-me"*/}
                            {/*         checked>*/}
                            {/*    <label className="form-check-label text-small" htmlFor="customControlInline">Remember*/}
                            {/*      me next time</label>*/}
                            {/*</div>*/}
                          </div>
                          <div className="text-center mt-3">
                            <button className="btn btn-lg btn-primary" type="submit">
                              Login
                            </button>
                            {/*<a href="dashboard-default.html" className="btn btn-lg btn-primary">Sign in</a>*/}
                            {/*  <!-- <button type="submit" className="btn btn-lg btn-primary">Sign in</button> -->*/}
                          </div>
                        </form>
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
}

export default Login;
