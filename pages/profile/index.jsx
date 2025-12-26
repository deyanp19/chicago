import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "@components/AppTheme";
import AppAppBar from "@components/AppAppBar";
// import Latest from '@components/Latest';
import Footer from "@components/Footer";
import ProfilePicture from "./page_components/ProfilePicture";
import ProfileInformation from "./page_components/ProfileInformation";
import Jumbotron from "@/components/jumbotron/Jumbotron";

export default function Profile(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Jumbotron image='images/24hours_sign.gif' >

        {/* <ProfilePicture /> */}
        <ProfileInformation />
        </Jumbotron>
        {/* <Latest /> */}
      </Container>
      <Footer />
    </AppTheme>
  );
}
