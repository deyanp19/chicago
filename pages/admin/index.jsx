import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "@components/AppTheme";
import AppAppBar from "@components/AppAppBar";
import Latest from "@components/Latest";
import Footer from "@components/Footer";
import AdminComponent from "@/components/admin/AdminComponent";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import LogTable from "@/components/log-table/LogTable";
import ArticlesTable from "@/components/articles-table/ArticlesTable";
import UsersTable from "@/components/users-table/UsersTable";

export default function AdminPanel(props) {
  const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
         <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Write Post" ></Tab>
        <Tab label="Table of Users" />
        <Tab label="Table of Articles" />
        <Tab label="Table of Logs" />
      </Tabs>
        <Box sx={{ mt: 2 }}>
        {value === 0 && <AdminComponent />}
        {value === 1 && <div><UsersTable/></div>}
        {value === 2 && <ArticlesTable/>}
        {value === 3 && <LogTable/>}
        {value === 4 && <div>Item Five Content</div>}
        {value === 5 && <div>Item Six Content</div>}
        {value === 6 && <div>Item Seven Content</div>}
      </Box>
    </Box>
        {/* <Latest /> */}
      </Container>
      <Footer />
    </AppTheme>
  );
}
