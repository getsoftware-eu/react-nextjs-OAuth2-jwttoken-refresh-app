import React from "react";

function Sidebox ({label, viewAsset, vorgang}) {
    
    let statusDiv;

    if(vorgang === 'Sa') {
        statusDiv = (
            <div className="row">
                <span className="col-sm-10">${viewAsset.saStatus}</span>
            </div>)
    } else if (vorgang === 'Sb') {
        statusDiv = (<span className="col-sm-10">${viewAsset.sbStatus}</span>)
    }
    
    return (
        <div className="card">
            <div className="card-body">
                <div className="row mt-3">
                    <label className="col-sm-4 col-form-label">Status</label>
                    <div className="col-sm-8 col-form-label">
                        { statusDiv }
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export {Sidebox}