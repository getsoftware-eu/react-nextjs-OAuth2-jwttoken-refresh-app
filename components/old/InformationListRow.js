import Image from "next/image";
import Link from "next/link";
import React from "react";

function InformationListRow({ information, user }) {
  return (
    <Link href={`/asset/informationSa/detail/${information.informationId}`}>
        <div
        className="cursor-pointer group hover:scale-105 p-3
            transition duration-200 ease-in-out"
        >
          {/*<div className="relative w-52 h-52 group-hover:shadow-lg">*/}
          {/*    <Image className="rounded-lg" src={imageUrl} fill alt="" />*/}
          {/*</div>*/}

          <span className="font-semibold py-1 text-center">InformationListRow:{information.name}:{user?.email}</span>
        </div>
    
    </Link>
  );
}

export default InformationListRow;
