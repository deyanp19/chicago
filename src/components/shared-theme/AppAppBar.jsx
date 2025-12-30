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
import ColorModeIconDropdown from '@components/ColorModeIconDropdown';
import ChicagoToursIcon from './ChicagoToursIcon';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AppAppBar = dynamic(() => Promise.resolve(AppAppBarComponent), { ssr: false });

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

const StayledLink = styled(Link)(({theme}) =>({
  textDecoration:'none'
}))

 function AppAppBarComponent() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { isLoggedIn, logout,user } = useContext(AuthContext);

  const handleSignOut = ()=> {
    event.preventDefault();    
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
            <Link href='/'>
              <ChicagoToursIcon  style={{ width: '100%'}} />
            </Link>
          { !isLoggedIn ? (
            <Box></Box>
          ): ( <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}  >
            {/* <Sitemark />  */}
            {/* <Box sx={{display: {xs: 'none', md: 'flex'},color:'text.primary' } }>
              {'Chicagotours © '}
            </Box> */}
            {/* Deyan - the component Sitemark is svg that every letter is path. Use this later to create your own , maybe make youtube video about it */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <StayledLink href="sightseeing">
                <Button variant="text" color="info" size="small">
                Sightseeings
                </Button>
              </StayledLink>
              <StayledLink href="highlights">
                <Button variant="text" color="info" size="small">
                  Highlights
                </Button>
              </StayledLink>
              <StayledLink href="shopping">
                <Button variant="text" color="info" size="small">
                Shopping in Chicago
                </Button>
              </StayledLink>
              {/* <Button variant="text" color="info" size="small">
                Blog
              </Button> */}
              <StayledLink href="/profile" >
                <Button>
                  Your Profile
                </Button>
              </StayledLink>
              {user.isAdmin && (<StayledLink href="/admin" >
                <Button>
                 Admin Dashboard
                </Button>
              </StayledLink>)}
            </Box>
          </Box>)
          }
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
                  <>
                  <StayledLink href="profile">
                  <MenuItem>Your Profile</MenuItem>
                  </StayledLink>
                  <StayledLink href="sightseeing">
                  <MenuItem>Sightseeings</MenuItem>
                  </StayledLink>
                  <StayledLink href="highlights">
                  <MenuItem>Highlights</MenuItem>
                  </StayledLink>
                  <StayledLink href="shopping">
                  <MenuItem>Shopping in Chicago</MenuItem>
                  </StayledLink>
                  {/* <MenuItem>Blog</MenuItem> */}
                  <StayledLink href="/">{

                 user.isAdmin && (<StayledLink href="admin">
                  <MenuItem>Admin Dashboard</MenuItem>
                  </StayledLink>)}
                  <MenuItem>
                    <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth
                    onClick={handleSignOut} >
                      Sign out
                    </Button>
                  </MenuItem>
                  </StayledLink>
                  </>
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

export default AppAppBar;