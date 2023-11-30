"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
// import {MenuIcon} from "@heroicons/react/outline";
// import {UserCircleIcon} from "@heroicons/react/solid";
// import UserService from "/services/userService";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
// import {remove} from "/redux/userSlice";
// import {useDispatch} from "react-redux";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

// <!-- Global TopNav -->
const AppTopNav = () => {
    
    const { data: session } = useSession();
    console.log({ session });
    
    if(session) {
        return (
            <>
                <nav className="navbar navbar-expand navbar-theme">
                    <a className="sidebar-toggle d-flex me-2">
                        <i className="hamburger align-self-center"></i>
                    </a>

                    <div className="navbar-collapse collapse">
                        {/*<a href="/user/me" className="navbar-text float-end ms-auto">{sessionUser?.name}</a>*/}
                        {session?.user ? (
                            <>
                                <a href="/user/me"
                                   className="navbar-text float-end ms-auto"> {session.user.username}</a>
                                {/*<button className="text-red-500" onClick={() => signOut()}>*/}
                                {/*    Sign Out*/}
                                {/*</button>*/}
                            </>
                        ) : (
                            <button className="text-green-600" onClick={() => signIn()}>
                                Sign In
                            </button>
                        )}
                        <ul className="navbar-nav px-2">
                            <li className="nav-item dropdown ms-lg-2">
                                <a className="nav-link dropdown-toggle position-relative" href="#" id="alertsDropdown"
                                   data-bs-toggle="dropdown">
                                    <i className="align-middle fas fa-bell"></i>
                                    <span className="indicator"></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                                     aria-labelledby="alertsDropdown">
                                    <div className="dropdown-menu-header">
                                        1 neue Nachricht
                                    </div>
                                    <div className="list-group">
                                        <a href="#" className="list-group-item">
                                            <div className="row g-0 align-items-center">
                                                <div className="col-2">
                                                    <i className="ms-1 text-warning fas fa-fw fa-envelope-open"></i>
                                                </div>
                                                <div className="col-10">
                                                    <div className="text-dark">Lorem ipsum</div>
                                                    <div className="text-muted small mt-1">Aliquam ex eros, imperdiet
                                                        vulputate
                                                        hendrerit et.
                                                    </div>
                                                    <div className="text-muted small mt-1">6h ago</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="dropdown-menu-footer">
                                        <a href="#" className="text-muted">Show all notifications</a>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown ms-lg-2">
                                <a className="nav-link dropdown-toggle position-relative" href="#" id="userDropdown"
                                   data-bs-toggle="dropdown">
                                    <i className="align-middle fas fa-cog"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <a className="dropdown-item" href="#"><i
                                        className="align-middle me-1 fas fa-fw fa-user"></i> Einstellungen</a>
                                    <div className="dropdown-divider"></div>

                                    {/*{ if (session) {*/}

                                    <a className="dropdown-item cursor-pointer"  
                                       onClick={() => {
                                           signOut({ callbackUrl: 'http://localhost:3000/login' });
                                       }}
                                        // dispatch(remove());
                                        // serverLogout();


                                    >
                                        <i
                                            className="align-middle me-1 fas fa-fw fa-arrow-alt-circle-right"></i> Ausloggen
                                    </a>
                                    {/*}*/}

                                </div>
                            </li>
                        </ul>
                        {/*<li>*/}
                        {/*        <div className="flex justify-end items-center space-x-4">*/}
                        {/*            {!session && (*/}
                        {/*                <Link href="/register">*/}
                        {/*                    <p className="text-gray-500 cursor-pointer hidden sm:inline-block">*/}
                        {/*                        Become a Host*/}
                        {/*                    </p>*/}
                        {/*                </Link>*/}
                        {/*            )}*/}
                        {/*            <div className="relative">*/}
                        {/*                <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-full px-2*/}
                        {/*cursor-pointer hover:shadow-lg hover:scale-105 transition duration-200 ease-in-out"*/}
                        {/*                     style={{backgroundColor: 'white'}}*/}
                        {/*                    onClick={() => setIsMenuOpen(!isMenuOpen)}*/}
                        {/*                >*/}
                        {/*                    <MenuIcon className="h-7 w-7" />*/}
                        {/*                    <UserCircleIcon className="h-10 w-10" color="white" />*/}
                        {/*                </div>*/}
                        {/*                {isMenuOpen ? (*/}
                        {/*                    <HeaderMenu*/}
                        {/*                        isLoggedIn={session === null}*/}
                        {/*                        userId={session?.userId}*/}
                        {/*                    />*/}
                        {/*                ) : null}*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*</li>*/}

                    </div>
                </nav>
            </>
        );
    }
    
    return (
        <div></div>
    );
}

export default AppTopNav;
