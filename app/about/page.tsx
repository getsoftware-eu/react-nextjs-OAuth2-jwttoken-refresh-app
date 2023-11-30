"use client";
import { useSession } from "next-auth/react";
import React from "react";

const AboutPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return <div>{session?.user.username}</div>;
};

export default AboutPage;
