import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import Hero from './components/Hero';
import Features from './components/Features';


export default function MarketingComponent(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
  
      {/* <Hero /> */}
      <div>
        {/* <LogoCollection /> */}
        {/* <Features /> */}
       <Divider />
       <Hero/>
        <Divider />
      </div>
    </AppTheme>
  );
}
