"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { PrimeReactProvider } from 'primereact/api';
import Bootstrap_PT from "./old/passthrough/bootstrap";
import { ToastContainer, toast } from 'react-toastify';

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
              <ToastContainer
                  autoClose={5000}
                  position="top-right"
                  hideProgressBar
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  icon={({ type }) => {
                      if (type === "success") return <i className="fa fa-check fs-2"/>;
                      if (type === "error") return "🚨";
                      else return "ℹ️";
                  }}
              />
          {children}
        </PrimeReactProvider>
      </SessionProvider>
  );
};

export default Providers;
