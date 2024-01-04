// import "styles/css/primereact/lara-light-indigo/mytheme.css";
// import "styles/css/primereact/prime-react-over.css";
import "styles/spark3/modern.scss";
import {Metadata} from 'next'
import React, {ReactNode} from "react";
import Providers from "./Providers";
import toast, { Toaster } from 'react-hot-toast';
// import App from './App';
// import {Head} from "next/document";
// import { Html, Head, Main, NextScript } from 'next/document';


interface RootLayoutProps {
  children: ReactNode;
}

/**
 * 
 * a new app/layout.tsx file inside the app directory. This is a root layout that will apply to all routes inside app.
 * The root layout is a Server Component by default and can not be set to a Client Component.
 * Only the root layout can contain <html> and <body> tags.
 * 
 * for sub-folders (/dashboard):
 * Use layout.js to define UI that is shared across multiple routes.
 * 
 * The root layout replaces the pages/_app.tsx and pages/_document.tsx files.
 * pages/_app.js and pages/_document.js have been replaced with a single app/layout.js root layout
 * @param children
 * @constructor
 */

export const metadata: Metadata = {
    title: 'Struktura',
    description: 'Welcome to Struktura',
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    // openGraph: {
    //     type: "website",
    //     title: "Sakai by PrimeReact | Free Admin Template for NextJS",
    //     url: "https://www.primefaces.org/sakai-react",
    //     description:
    //         "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
    //     images: ["https://www.primefaces.org/static/social/sakai-nextjs.png"],
    //     ttl: 604800,
    // },
    icons: {
        icon: "/favicon.ico",
    },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
  // <PrimeReactProvider value={{ unstyled: true, pt: Bootstrap_PT }}>
    <html lang="de" suppressHydrationWarning>
        {/*<head>*/}
        {/*    <link*/}
        {/*        id="theme-css"*/}
        {/*        href={`/styles/spark3/modern.scss`}*/}
        {/*        rel="stylesheet"*/}
        {/*    ></link>*/}
        {/*</head>*/}
      <body>
        <Providers>
            {/*<div className="wrapper">*/}
            {/*    <PrimeReactProvider value={{ unstyled: true }}>*/}
             <div className={"  h-screen "}>{children}</div>
                {/*</PrimeReactProvider>*/}
            {/*</div>*/}
            <Toaster position="top-right" 
                toastOptions={{
                    className: 'alert',
                    style: {
                        color: '#fff',
                    },
                    duration: 50000,

                    success: {
                        className: 'alert-success',
                        style: {
                            background: '#28a745',
                        },
                        iconTheme: {
                            primary: '#28a745',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        className: 'alert-danger',
                        style: {
                            background: '#dc3545',
                        },
                        iconTheme: {
                            primary: '#dc3545',
                            secondary: '#fff',
                        },
                    }
                }}
            />
        </Providers>

        <svg width="0" height="0" style={{position: 'absolute'}}>
            <defs>
                <symbol viewBox="0 0 512 512" id="ion-ios-pulse-strong">
                    <path
                        d="M448 273.001c-21.27 0-39.296 13.999-45.596 32.999h-38.857l-28.361-85.417a15.999 15.999 0 0 0-15.183-10.956c-.112 0-.224 0-.335.004a15.997 15.997 0 0 0-15.049 11.588l-44.484 155.262-52.353-314.108C206.535 54.893 200.333 48 192 48s-13.693 5.776-15.525 13.135L115.496 306H16v31.999h112c7.348 0 13.75-5.003 15.525-12.134l45.368-182.177 51.324 307.94c1.229 7.377 7.397 11.92 14.864 12.344.308.018.614.028.919.028 7.097 0 13.406-3.701 15.381-10.594l49.744-173.617 15.689 47.252A16.001 16.001 0 0 0 352 337.999h51.108C409.973 355.999 427.477 369 448 369c26.511 0 48-22.492 48-49 0-26.509-21.489-46.999-48-46.999z">
                    </path>
                </symbol>
            </defs>
        </svg>
        <script src="/dist/js/app.js"></script>
        <script src="/js/messages_de.js"></script>
        <script src="/js/custom.js"></script>
        <script src="/js/validation.js"></script>
        {/*<#-- https://www.jacklmoore.com/autosize/-->*/}
        <script src="/js/autosize.min.js"></script>
        <script src="/js/autosize.helper.js"></script>
        <script src="/js/inline-select.js"></script>
        <script>
            {/*showSuccess('{systemMsg}');*/}
            {/*document.addEventListener("keydown", function(event) {*/}
            {/*    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {*/}
            {/*         event.preventDefault();*/}
            {/*    }*/}
            {/*});*/}
            {/*autosize(document.querySelectorAll('textarea'));*/}
        </script>
      
      </body>
    </html>
  // </PrimeReactProvider>
  );
}
