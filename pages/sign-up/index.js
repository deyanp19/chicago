import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '@components/AppTheme';
import AppAppBar from '@components/AppAppBar';
import MainContent from '@components/MainContent';
import Latest from '@components/Latest';
import Footer from '@components/Footer';
import SignUp from '@components/sign-up/SignUp';

export default function Blog(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      {/* <AppAppBar /> */}
        <SignUp />
      <Footer />
    </AppTheme>
  );
}
