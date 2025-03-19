import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {useEffect} from 'react';
import Link from 'next/link';

 
import 'bootstrap/dist/css/bootstrap.css';

export default function MyApp(props) {
    const { Component,pageProps } = props;
    useEffect(()=>{
        import("bootstrap/dist/js/bootstrap");
},[]);
    return (
         <>
            <Head>
            <title>Payarc</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
 
{/* <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-rHOJ2ThTcX7Lm8xJF4u8OG45Kkh3VrJF2vfnbc6V9W3I6YGPp8q3BsL5k/pJJoY0" crossorigin="anonymous"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css"/> */}
            </Head>
  
            <Component {...pageProps} />
        </>
    );
  }
  
  MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
  };