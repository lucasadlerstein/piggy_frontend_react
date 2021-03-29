import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({children}) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <meta name="robots" content="index, follow" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
                <link rel="shortcut icon" href="/img/logos/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/img/logos/favicon.ico" type="image/x-icon" />
            </Head>
            <NavBar />
            {children}
            <Footer />

        </>
    );
}
 
export default Layout;