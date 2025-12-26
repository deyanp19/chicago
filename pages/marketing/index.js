import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '@components/AppTheme';
import AppAppBar from '@components/AppAppBar';
import MainContent from '@components/MainContent';
import Latest from '@components/Latest';
import Footer from '@components/Footer';
import MarketingComponent from '@/components/marketing-page/MarketingComponent.jsx';

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
      <MarketingComponent />
      </Container>
      <Footer />
    </AppTheme>
  );
}
