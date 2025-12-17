import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '@/components/shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import Chicagotours from './Chicagotours';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleSignOut = ()=> {
    event.preventDefault();
    console.log('sign out clicked');
    
    logout();
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'url(/images/chicago_skyline_hancock.gif)',
       
        backgroundPosition: 'center top 520px',
        mt: 'calc(var(--template-frame-height, 0px) + 18px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters sx={{ backdropFilter: "blur(3px)"}}  >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}  >
            {/* <Sitemark />  */}
            <Link href='/'>
              <Chicagotours  style={{ width: '100%'}} />
            </Link>
            {/* <Box sx={{display: {xs: 'none', md: 'flex'},color:'text.primary' } }>
              {'Chicagotours © '}
            </Box> */}
            {/* Deyan - the component Sitemark is svg that every letter is path. Use this later to create your own , maybe make youtube video about it */}
            {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                Features
              </Button>
              <Button variant="text" color="info" size="small">
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small">
                Highlights
              </Button>
              <Button variant="text" color="info" size="small">
                Pricing
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Blog
              </Button>
            </Box> */}
          </Box>
          <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                alignItems: 'center',
              }}
            >
              { !isLoggedIn ? (
            <>
                <Link href="/sign-in">
                  <Button color="primary" variant="text" size="small" >
                  Sign in
                  </Button>
                </Link>
            
                <Link href="/sign-up">
                  <Button color="primary" variant="contained" size="small" >
                    Sign up
                  </Button>
                </Link>
            </>
             ) : (
              <>
              <Link href="/">
                <Button 
                color="primary" 
                variant="text" 
                size="small"
                onClick={handleSignOut} >
                Sign out
              </Button>
              </Link>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {/* <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem> */}
                <Divider sx={{ my: 3 }} />
                 { !isLoggedIn ? (
                <>
                  <Link href="/sign-up">
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth>
                        Sign up
                      </Button>
                    </MenuItem>
                  </Link>
                  <Link href="/sign-in">
                  <MenuItem>
                    <Button color="primary" variant="outlined" fullWidth>
                      Sign in
                    </Button>
                  </MenuItem>
                  </Link>
                </>
                ) : (
                  <Link href="/">
                  <MenuItem>
                    <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth
                    onClick={handleSignOut} >
                      Sign out
                    </Button>
                  </MenuItem>
                  </Link>
                ) 
                }
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
