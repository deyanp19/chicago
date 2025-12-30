import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "@components/AppTheme";
import AppAppBar from "@components/AppAppBar";
import Latest from "@components/Latest";
import Footer from "@components/Footer";
import AdminComponent from "@/components/admin/AdminComponent"

export default function AdminPanel(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <AdminComponent />
        {/* <Latest /> */}
      </Container>
      <Footer />
    </AppTheme>
  );
}
