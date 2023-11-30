"use client";
import {H1} from "/components/common/Сontent";
import React, {useEffect, useState} from "react";
import InformationSaListTable from "/components/asset/information/sa/InformationSaListTable";
import InformationSaListDataTable from "/components/asset/information/sa/InformationSaListDataTable";
import SideNav from "/components/common/nav/SideNav";
import TopNav from "/components/common/nav/TopNav";
import AppTopNav from "../../../AppTopNav";
import FooterNav from "/components/common/nav/FooterNav";
// import UserService from "/services/userService";
import {useSession} from "next-auth/react";
// import Interceptor from "/interceptors/interceptor";
import * as Session from "next-auth/react";
// import InformationService from "/services/informationService";
import Cookies from 'universal-cookie';
import useAxiosAuth from "../../../../lib/hooks/useAxiosAuth";

export default function InformationSaList({users }) {

    const {data: session, status} = useSession();
    const axiosAuth = useAxiosAuth();

    const [informations, setInformations] = useState({});

    const fetchPost = async () => {
        const res = await axiosAuth.get("/api/v1/asset/informations/");

        let informationArray = res.data;
        if (Array.isArray(informationArray)) {
            setInformations(informationArray);
        }
    };
    
    // const fetchPost = async () => {
    //
    //     // const response = await res.json();
    //     // setPosts(response);
    //     if (session) {
    //         const informationService = new InformationService(session);
    //
    //         informationService.getAll().then(
    //             (res) => {
    //                 if (Array.isArray(res.data)) {
    //                     setInfos(res.data);
    //                 }
    //             }
    //         );
    //     }
    // };
    
    useEffect(() => {

            if (session) {
                fetchPost().then();
                // let userService = new UserService(session);
                // const informationService = new InformationService(session);
                //
                // informationService.getAll().then(
                //     (res) => {
                //         if (Array.isArray(res.data)) {
                //             setInformations(res.data);
                //         }
                //     }
                // );
            }
       //wait untill session!! sonst keine Abfrage!
    }, [session])
        
        // const informations = fetch("http://localhost:8080/api/v1/asset/informations/").then(
        //     (res) => res.json()
        // );
        //
        // const users = fetch("http://localhost:8080/api/v1/users/").then(
        //     (res) => res.json()
        // );
    // }, session);
   
    if (session) {
    return (
        <>
        <div className="wrapper">
            <SideNav />
            <div className="main">
                <AppTopNav/>
                <main className="content">
                    <div className="container-fluid">
                        <div className="header">
                            <H1 text="Informationen" />
                            <p className="header-subtitle">Strukturanalyse</p>
                        </div>
                        {/*<#nested />*/}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <InformationSaListDataTable informations={informations}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/*<@footer />*/}
                <FooterNav />
            </div>
        </div>
        </>
    );}
    return <p>Loading...</p>

}


export async function getServerSidePropsasync({ req, query, res }) {

    const cookies = new Cookies(req?.headers?.cookie);
    cookies.get("token")

    cookies.set('test-cookie', 'true', {
        httpOnly: true,
    });

    // Set the cookie in the response's headers
    res.setHeader('Set-Cookie', cookies.getAll());
    
    return {
        props: {
            isRegistered: !!cookies.get('test-cookie'),
        },
    };
}
//
//     // this will contain the session object post verification
//     let session
//
//     let axiosInstance = new Interceptor(session).getInstance();
//
//
//     try {
//         // getSession will do session verification for us
//         session = await Session.getSession(context.req, context.res, {
//             overrideGlobalClaimValidators: () => {
//                 // this makes it so that no custom session claims are checked
//                 return []
//             }})
//     } catch (err) {
//         if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
//
//             // in this case, the session is still valid, only the access token has expired.
//             // The refresh token is not sent to this route as it's tied to the /api/auth/session/refresh API paths.
//             // So we must send a "signal" to the frontend which will then call the 
//             // refresh API and reload the page.
//
//             return { props: { fromSupertokens: 'needs-refresh' } }
//             // or return {fromSupertokens: 'needs-refresh'} in case of getInitialProps
//         } else if (err.type === Session.Error.UNAUTHORISED) {
//             // in this case, there is no session, or it has been revoked on the backend.
//             // either way, sending this response will make the frontend try and refresh
//             // which will fail and redirect the user to the login screen.
//             return { props: { fromSupertokens: 'needs-refresh' } }
//         }
//
//         throw err
//     }
//
//   
    // const navigationMenus = await fetch("http://localhost:8080/navigation/list").then(
    //     (res) => res.json()
    // );

    // return {
    //     props: {
    //         session: await getServerSession(
    //
    //         let informations = await axiosInstance.get("http://localhost:8080/api/v1/asset/informations/").then(
    //             (res) => res.data
    //         );
    //
    //         let users = await axiosInstance.get("http://localhost:8080/api/v1/users/").then(
    //             (res) => res.data
    //         );
    //         informations,
    //         users
    //         )
    //     },
    // };
// }
