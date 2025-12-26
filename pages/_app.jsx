import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {useEffect} from 'react';
import { AuthProvider } from '../src/context/AuthContext';

import 'bootstrap/dist/css/bootstrap.css';

export default function MyApp(props) {
    const { Component,pageProps } = props;
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap").catch((error) => {
            console.error("Bootstrap import failed:", error);
        });
    }, []);
    return (
         <>
            <Head>
              <title>Chicagotours</title>
              <meta name="viewport" content="initial-scale=1, width=device-width,user-scalable=yes" />
 
            </Head>
            <AuthProvider >
              <Component {...pageProps} />
            </AuthProvider>
        </>
    );
  }
  
  MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,// consider deleting this line if no problems with emotion
    pageProps: PropTypes.object.isRequired,
  };