"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { PrimeReactProvider } from 'primereact/api';
import Bootstrap_PT from "./old/passthrough/bootstrap";

interface Props {
  children: ReactNode;
}

/**
 * Is client-component for Providers
 * @param children
 * @constructor
 */
const Providers = ({ children }: Props) => {
  return (
      <SessionProvider>
          <PrimeReactProvider value={{ unstyled: false, pt: Bootstrap_PT }}>
          {children}
        </PrimeReactProvider>
      </SessionProvider>
  );
};

export default Providers;
