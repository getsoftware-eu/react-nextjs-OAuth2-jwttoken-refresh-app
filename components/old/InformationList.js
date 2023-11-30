import React from "react";
import InformationListRow from "./InformationListRow";

export default function InformationList({ informations, user }) {
  return (
    <div className="px-8  sm:px-16 max-w-7xl mx-auto">
      <p className="text-xl font-bold my-6 text-[#633036] border-t-[1.5px] border-gray-300 pt-5">
          InformationListComp
      </p>
      <div
        className="flex overflow-scroll scrollbar-thin  
      scrollbar-thumb-teal-600 space-x-3 overflow-y-hidden"
      >
        {informations.map((nextInformation) => (
          <InformationListRow
            key={nextInformation.informationId}
            information={nextInformation}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
