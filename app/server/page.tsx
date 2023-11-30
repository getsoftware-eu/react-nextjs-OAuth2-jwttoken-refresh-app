import { AuthGetApi } from "lib/fetchApi";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React from "react";

const ServerPage = async () => {
  const posts = await AuthGetApi("/api/v1/asset/informations/");

  console.log("AuthGetApi: " + posts);
  
  return <div>{JSON.stringify(posts)}</div>;
};

export default ServerPage;
