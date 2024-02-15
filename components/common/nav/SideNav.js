import React from "react";
import FeatherIcon from 'feather-icons-react';
import {usePathname} from "next/navigation";

// <!-- Global Nav -->
function SideNav({pagePath, message, error}) {

    let systemMsg;

    if(message)
        systemMsg = message
    else if (error)
        systemMsg = error

    const pathname = usePathname();

    // const getServerAsynchInitData = async () => {
    //     const res = await axiosAuth.get("/api/v1/user/informations/");
    //
    //     let informationArray = res.data;
    //     if (Array.isArray(informationArray)) {
    //         setAssets(informationArray);
    //         sessionUpdated=true;
    //     }
    // };

    function sidebarItem(url, label, iconActive=false, disabled=false, customIcon) {
        return <li
            className={pathname.startsWith(url) ? "sidebar-item active" : "sidebar-item"}>
            { disabled ?
                (
                    <a className="disabledLink sidebar-link dropdown-item disabled">
                        {/*<i className="align-middle me-2 fas fa-fw fa-check "></i>*/}
                        {customIcon? 
                            <i className={"align-middle me-2 " + (customIcon) + " disabledLink"}></i>
                            : 
                            <FeatherIcon icon="file" className="align-middle me-2 disabledLink"/>
                        }
                        <span className="align-middle">{label}</span>
                    </a>
                )
                :
                (
                    <a className="sidebar-link" href={url}>
                        <i className={"align-middle me-2 " + (customIcon? customIcon : iconActive? "far fa-fw fa-edit" : "fas fa-fw fa-check")}></i>
                        <span className="align-middle">{label}</span>
                    </a>
                )

            }
        </li>;
    }

    return (
        <>
            <nav id="sidebar" className="sidebar">
                <a className="sidebar-brand" href="/">
                <img src="/img/samson2.png" width="26" height="26" alt="GovRiCo" className="me-2"/>GovRiCo
                </a>
                <div className="sidebar-content">
                    <ul className="sidebar-nav mt-2">

                    {sidebarItem("/dashboard", "Dashboard", false,false,"fas fa-home")}

                        <li className="sidebar-item">
                            <a data-bs-target="#planNavbar" data-bs-toggle="collapse"
                               className="sidebar-link collapsed disabledLink disabled">
                                <i className="align-middle me-2 far fa-fw fa-calendar-alt disabledLink"></i>
                                <span className="align-middle">Jahresplanung</span>
                            </a>
                            <ul id="planNavbar" className="sidebar-dropdown list-unstyled collapse"
                                data-bs-parent="#sidebar">

                                {sidebarItem("/planYear/sa", "Strukturanalyse",  false,true, "far fa-fw fa-calendar-alt")}
                                {sidebarItem("/planYear/sb", "Schutzbedarfanalyse",  false,true, "far fa-fw fa-calendar-alt")}
                                
                            </ul>
                        </li>

                        {sidebarItem("/report", "Reports",  false,true, "fas fa-fw ion ion-md-stats")}

                        <li className="sidebar-header">
                            STRUKTURANALYSE
                        </li>

                        {sidebarItem("/asset/informationSa/list", "Informationen", true, false)}
                        {sidebarItem("/asset/prozessSa/list", "Prozesse", false, true)}
                        {sidebarItem("/asset/anwendungSa/list", "Anwendungen",  false,true)}
                        {sidebarItem("/asset/ciSa/list", "Ci",  false,true)}

                        <li className="sidebar-header">
                            SCHUTZBEDARFANALYSE
                        </li>

                        {sidebarItem("/asset/informationSb/list", "Informationen", false, true)}
                        {sidebarItem("/asset/prozessSb/list", "Prozesse", false, true)}
                        {sidebarItem("/asset/anwendungSb/list", "Anwendungen", false,true)}
                        {sidebarItem("/asset/ciSb/list", "Ci",  false,true)}

                        <li className="sidebar-header">
                            BUSINESS IMPACT ANALYSE
                        </li>

                        {sidebarItem("/bia/prozess/list", "Prozesse", false, true)}

                        <li className="sidebar-header">
                            UNTERNEHMENSRICHTLINIEN
                        </li>

                        {sidebarItem("/richtlinie/list/intern/true", "Interne Richtlinien", false, true)}

                        {/*<li className="sidebar-item">*/}
                        {/*    <a className="sidebar-link" href="/richtlinie/list/intern/true">*/}
                        {/*        <FeatherIcon icon="file" className="align-middle me-2 disabledLink"/>*/}
                        {/*        <span className="align-middle">Interne Richtlinien</span>*/}
                        {/*    </a>*/}
                        {/*</li>*/}

                        <li className="sidebar-header">
                            RISIKOMANAGEMENT
                        </li>
                        
                        <li className="sidebar-item">
                            <a data-bs-target="#raNavbar" data-bs-toggle="collapse"
                               className="sidebar-link collapsed disabledLink">
                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink"/>
                                <span className="align-middle">Self Assessment</span>
                            </a>
                            <ul id="raNavbar" className="sidebar-dropdown list-unstyled collapse"
                                data-bs-parent="#sidebar">

                                {sidebarItem("/ra/sa/prozess", "Prozesse", false, true)}
                                {sidebarItem("/ra/sa/anwendung", "Anwendungen", false, true)}
                                
                            </ul>
                        </li>

                        {sidebarItem("/ra/riskDecision", "Risikoentscheidung", false, true)}
                        {sidebarItem("/ra/riskInventar", "Risikoinventar", false, true)}
                        {sidebarItem("/ra/massnahme", "Maßnahmen", false, true)}

                        <li className="sidebar-header">
                            ARCHIV
                        </li>

                        {sidebarItem("/archiv/2022", "2022", false, true)}
                        {sidebarItem("/archiv/2021", "2021", false, true)}
                        {sidebarItem("/archiv/older", "Älter", false, true)}

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default SideNav;
