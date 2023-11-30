import React from "react";
import ContentComp from "/components/struktura/ContentComp";

function PageComp(children) {
    return (
        <div className="wrapper">
            {/*<SideNavComp/>*/}
            <div className="main">
                {/*<TopNavComp/>*/}
                <main className="content">
                    <div className="container-fluid">
                        <ContentComp text="Willkommen"/> 
                        {/*TODO children??*/}
                    </div>
                </main>
                {/*<FooterComp/>*/}
            </div>
        </div>
    )
}

export default PageComp