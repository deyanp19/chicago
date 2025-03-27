import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '@/components/shared-theme/AppTheme';
import AppAppBar from '@/components/shared-theme/AppAppBar';
import MainContent from '@/components/shared-theme/MainContent';
import Latest from '@/components/shared-theme/Latest';
import Footer from '@/components/shared-theme/Footer';

export default function Blog(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        {/* <Latest /> */}
      </Container>
      <Footer />
    </AppTheme>
  );
}
