import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {useEffect} from 'react';
import Link from 'next/link';
import { AuthProvider } from '../src/context/AuthContext';

 
import 'bootstrap/dist/css/bootstrap.css';

export default function MyApp(props) {
    const { Component,pageProps } = props;
    useEffect(()=>{
        import("bootstrap/dist/js/bootstrap");
},[]);
    return (
         <>
            <Head>
              <title>Chicagotours</title>
            </Head>
            <AuthProvider >
              <Component {...pageProps} />
            </AuthProvider>
        </>
    );
  }
  
  MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
  };