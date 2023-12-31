import React from "react";
import FeatherIcon from 'feather-icons-react';

// <!-- Global Nav -->
function SideNav(message, error) {

    let systemMsg;

    if(message)
        systemMsg = message
    else if (error)
        systemMsg = error

    return (
        <>
            <nav id="sidebar" className="sidebar">
                <a className="sidebar-brand" href="/">
                    <img src="/img/samson2.png" width="26" height="26" alt="GovRiCo" className="me-2"/>GovRiCo
                </a>
                <div className="sidebar-content">
                    <ul className="sidebar-nav mt-2">

                        <li className="sidebar-item">
                            
                        
                        {/*    <a className="sidebar-link disabledLink disabled">*/}
                        
                        {/*        <i className="align-middle me-2 fas fa-fw fa-exchange-alt "></i>*/}
                        {/*        <span className="align-middle">Workflow-Debug</span>*/}
                        
                        
                        {/*    </a>*/}
                        {/*</li>*/}
                        
                        {/*<li className="sidebar-item">*/}




                            <a className="sidebar-link" href="/dashboard">

                                <i className="align-middle me-2 fas fa-fw fa-home "></i>
                                <span className="align-middle">Dashboard</span>


                            </a>
                        </li>


                        <li className="sidebar-item">
                            <a data-bs-target="#planNavbar" data-bs-toggle="collapse"
                               className="sidebar-link collapsed disabledLink disabled">
                                <i className="align-middle me-2 far fa-fw fa-calendar-alt disabledLink"></i>
                                <span className="align-middle">Jahresplanung</span>
                            </a>
                            <ul id="planNavbar" className="sidebar-dropdown list-unstyled collapse"
                                data-bs-parent="#sidebar">

                                <li className="sidebar-item">




                                    <a className="disabledLink sidebar-link dropdown-item disabled">

                                        <i className="align-middle me-2 far fa-fw fa-calendar-alt disabledLink"></i>
                                        <span className="align-middle">Strukturanalyse</span>


                                    </a>
                                </li>

                                <li className="sidebar-item">




                                    <a className="disabledLink sidebar-link dropdown-item disabled">

                                        <i className="align-middle me-2 far fa-fw fa-calendar-alt disabledLink"></i>
                                        <span className="align-middle">Schutzbedarfanalyse</span>


                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item">





                            <a className="sidebar-link disabledLink disabled" href="#">

                                <i className="align-middle me-2 fas fa-fw ion ion-md-stats "></i>
                                <span className="align-middle">Reports</span>


                            </a>
                        </li>


                        <li className="sidebar-header">
                            STRUKTURANALYSE
                        </li>

                        <li className="sidebar-item active">




                            <a className="sidebar-link" href="/asset/informationSa/list">

                                <i className="align-middle me-2 far fa-fw fa-edit "></i>
                                <span className="align-middle">Informationen</span>


                            </a>
                        </li>

                        <li className="sidebar-item">




                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                
                                {/*<i className="align-middle me-2 fas fa-fw fa-check "></i>*/}
                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Prozesse</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                {/*<i className="align-middle me-2" data-feather="file"></i>*/}
                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Anwendungen</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Ci</span>

                            </a>
                        </li>

                        <li className="sidebar-header">
                            SCHUTZBEDARFANALYSE
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Informationen</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Prozesse</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Anwendungen</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                {/*<i className="align-middle me-2 disabledLink" data-feather="file"></i>*/}
                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Ci</span>


                            </a>
                        </li>

                        <li className="sidebar-header">
                            BUSINESS IMPACT ANALYSE
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Prozesse</span>


                            </a>
                        </li>

                        <li className="sidebar-header">
                            UNTERNEHMENSRICHTLINIEN
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="sidebar-link" href="/richtlinie/list/intern/true">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Interne Richtlinien</span>


                            </a>
                        </li>

                        <li className="sidebar-header">
                            RISIKOMANAGEMENT
                        </li>


                        <li className="sidebar-item">
                            <a data-bs-target="#raNavbar" data-bs-toggle="collapse"
                               className="sidebar-link collapsed disabledLink">
                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Self Assessment</span>
                            </a>
                            <ul id="raNavbar" className="sidebar-dropdown list-unstyled collapse"
                                data-bs-parent="#sidebar">

                                <li className="sidebar-item">


                                    


                                    <a className="disabledLink sidebar-link dropdown-item disabled">

                                        <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                        <span className="align-middle">Prozesse</span>


                                    </a>
                                </li>

                                <li className="sidebar-item">


                                    


                                    <a className="disabledLink sidebar-link dropdown-item disabled">

                                        <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                        <span className="align-middle">Anwendungen</span>


                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Risikoentscheidung</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Risikoinventar</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="sidebar-link" href="/massnahme/list">

                                <FeatherIcon icon="file" className="align-middle me-2 disabledLink" />
                                <span className="align-middle">Maßnahmen</span>


                            </a>
                        </li>

                        <li className="sidebar-header">
                            ARCHIV
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <i className="align-middle me-2 fas fa-fw fa-file-alt disabledLink"></i>
                                <span className="align-middle">2022</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <i className="align-middle me-2 fas fa-fw fa-file-alt disabledLink"></i>
                                <span className="align-middle">2021</span>


                            </a>
                        </li>

                        <li className="sidebar-item">


                            


                            <a className="disabledLink sidebar-link dropdown-item disabled">

                                <i className="align-middle me-2 fas fa-fw fa-file-alt disabledLink"></i>
                                <span className="align-middle">Älter</span>


                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default SideNav;
