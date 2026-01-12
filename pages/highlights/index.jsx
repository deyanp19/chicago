import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "@components/AppTheme";
import AppAppBar from "@components/AppAppBar";
import Footer from "@components/Footer";
import Typography from '@mui/material/Typography';


export default function Highlights(props) {
  return (
    <AppTheme {...props} >
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Typography variant="h3">Highlights</Typography>
        <Typography variant="body1" paragraph>
            Downtown Chicago is a vibrant hub of culture and architecture, offering unforgettable sightseeing experiences. Start at Millennium Park, where the iconic Cloud Gate sculpture, affectionately known as "The Bean," reflects the city's skyline and provides stunning photo opportunities. Stroll along Michigan Avenue for world-class shopping and dining, or take a boat tour on the Chicago River to admire architectural gems like the Willis Tower and the historic Wrigley Building.
          </Typography>
          <Typography variant="body1" paragraph>
            Navy Pier beckons with Ferris wheel rides, live entertainment, and breathtaking Lake Michigan views. For history buffs, the Art Institute houses masterpieces from Van Gogh to Grant Wood. Whether you're exploring Grant Park's gardens or catching a show at the theater district, downtown Chicago blends urban energy with scenic beauty, making it a must-visit for any traveler seeking adventure and inspiration.
          </Typography>
          {/* End of change */}
       
        {/* <Latest /> */}
      </Container>
      <Footer />
    </AppTheme>
  );
}
