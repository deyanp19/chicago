import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppTheme from "@components/AppTheme";
import AppAppBar from "@components/AppAppBar";
import Footer from "@components/Footer";
import Jumbotron from "@/components/jumbotron/Jumbotron";

export default function Sightseeing(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Jumbotron image='images/24hours_sign.gif'>
          {/* ... existing code for the previous article ... */}
          {/* {{change 1}} Add the new article as additional Typography elements */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Exploring the Magnificent Mile
          </Typography>
          <Typography variant="body1" paragraph>
            The Magnificent Mile, a legendary stretch of Michigan Avenue in downtown Chicago, is a shopper's paradise and a cultural icon, spanning about 13 blocks from the Chicago River to Oak Street. This bustling corridor is renowned for its blend of high-end retail, historic architecture, and vibrant street life, drawing millions of visitors annually.
          </Typography>
          <Typography variant="body1" paragraph>
            Anchored by luxury brands like Chanel, Gucci, and Saks Fifth Avenue, it's a haven for fashion enthusiasts seeking everything from designer clothing to exclusive jewelry. Beyond shopping, the area boasts world-class dining options, from upscale steakhouses like Gibsons Bar & Steakhouse to trendy cafes offering Chicago's famous deep-dish pizza.
          </Typography>
          <Typography variant="body1" paragraph>
            Architectural marvels line the street, including the iconic Wrigley Building and the neo-Gothic Tribune Tower, which features stones from global landmarks embedded in its facade. Visitors can ascend the John Hancock Center for panoramic views of the city and Lake Michigan, or relax in one of the many plazas and public art installations.
          </Typography>
          <Typography variant="body1" paragraph>
            The Magnificent Mile also hosts seasonal events, such as the dazzling holiday lights in winter or the festive Great Flower Show in spring, adding to its allure. For families, it's an ideal spot for leisurely walks, with access to nearby attractions like Millennium Park and the Chicago Riverwalk. Whether you're indulging in retail therapy, savoring gourmet cuisine, or simply people-watching, the Magnificent Mile encapsulates Chicago's dynamic spirit.
          </Typography>
          {/* End of change */}
        </Jumbotron>
        {/* <Latest /> */}
      </Container>
      <Footer />
    </AppTheme>
  );
}