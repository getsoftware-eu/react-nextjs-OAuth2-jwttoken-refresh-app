import React from "react";

// <!-- Global TopNav -->
function FooterNav(message, error) {

    let systemMsg;

    if(message)
        systemMsg = message
    else if (error)
        systemMsg = error

    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row text-muted">
                        <div className="col-8 text-start">
                            {/*<ul className="list-inline">*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a className="text-muted" href="#">Support</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a className="text-muted" href="#">Privacy</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a className="text-muted" href="#">Terms of Service</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a className="text-muted" href="#">Contact</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>
                        <div className="col-4 text-end">
                            <p className="mb-0">
                                 © 2023 - <a href="https://4tek.de" target="_blank" className="text-muted">4Tek GmbH</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterNav;
