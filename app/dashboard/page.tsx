"use client";
import { PieChart } from '@mui/x-charts/PieChart';
import {useSession} from "next-auth/react";
import React from "react";
import SideNav from "../../components/common/nav/SideNav";
import AppTopNav from "../nav/AppTopNav";
import {H1} from "../../components/common/Сontent";
import FooterNav from "../../components/common/nav/FooterNav";

const DashboardPage = () => {
    const { data: session } = useSession();
    console.log(session);

    return <>
        <div className="wrapper">
            <SideNav />
            <div className="main">
                <AppTopNav/>
                <main className="content">
                    <div className="container-fluid">
                        <div className="header">
                            <H1 text="Dashboard" />
                            {/*<nav aria-label="breadcrumb">*/}
                            {/*    <ol className="breadcrumb">*/}
                            {/*        <li className="breadcrumb-item"><a href="/asset/informationSa/list">Informationen</a></li>*/}
                            {/*        <li className="breadcrumb-item active" aria-current="page">neue Information</li>*/}
                            {/*    </ol>*/}
                            {/*</nav>*/}
                        </div>
                        {/*<#nested />*/}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">

                                        <PieChart
                                            height={250}
                                            colors={['red', 'blue', 'green']} // Use palette
                                            series={[
                                                {
                                                    data: [
                                                        { id: 0, value: 10, label: 'series A' },
                                                        { id: 1, value: 15, label: 'series B' },
                                                        { id: 2, value: 20, label: 'series C' },
                                                    ],
                                                },
                                            ]}
                                        />;
                                        
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
    </>;
};

export default DashboardPage;