import React from 'react'
import InformationViewComponent from './InformationViewComponent'

function InformationListComponent({informations}) {
  return (
    <div>
        <h2>My Informations · {informations.length > 10 ? "10+" : informations.length} Information</h2>
        <div className='border border-1 border-slate-300 my-1' />
        <div className='pt-2'>
          {informations.map(information => (
            <InformationViewComponent key={information.informationId} information={information} />
          ))}
        </div>


    </div>
  )
}

export default InformationListComponent