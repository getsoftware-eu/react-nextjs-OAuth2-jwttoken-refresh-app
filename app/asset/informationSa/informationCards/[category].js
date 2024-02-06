import Header from "/components/common/Header";
import InformationCategoryViewRow from "/components/struktura/InformationCategoryViewRow";
import React from "react";

function Category({ informations,category }) {
  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto ">
        <h3 className="text-xl mt-12 px-8 font-semibold">
          {category} Informations{" "}
          <span className="text-gray-500 text-sm"> · {informations.length > 10 ? "10+" : informations.length} Stays </span>
        </h3>
        <div className="border-b border-gray-300 mx-8 mt-2" />

        <div className="py-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {informations.map((information) => (
            <InformationCategoryViewRow key={information.informationId} information={information} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.params;

  const informations = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/asset/informations/getByCategoryName/" + category
  ).then((res) => res.json());

  return {
    props: {
      informations,
      category
    },
  };
}

export default Category;
