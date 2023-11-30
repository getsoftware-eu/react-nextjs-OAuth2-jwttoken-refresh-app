"use client";
import { useSession } from "next-auth/react";
import React, {useEffect} from "react";

const AboutPage = () => {
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return <div>page</div>;
};

export default AboutPage;
