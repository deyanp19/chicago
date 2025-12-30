import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "@components/AppTheme";
import AppAppBar from "@components/AppAppBar";
import Footer from "@components/Footer";
import Jumbotron from "@/components/jumbotron/Jumbotron";
import Typography from '@mui/material/Typography';


export default function ShoppingPage() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container id="article" sx={{  xs: 8, my: 16 ,gap: 4 }}>
        {/* {{change 2}} Add the article as Typography elements */}
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping in Downtown Chicago
        </Typography>
        <Typography variant="body1" paragraph>
          Downtown Chicago stands as a premier shopping destination, blending historic charm with modern retail innovation, particularly along the iconic Magnificent Mile on Michigan Avenue. This bustling stretch, spanning from the Chicago River to Oak Street, features a curated mix of high-end department stores, boutiques, and flagship outlets that attract millions of visitors annually.
        </Typography>
        <Typography variant="body1" paragraph>
          One of the most prominent landmarks is Macy's on State Street, originally the flagship of Marshall Field's, which has been a retail cornerstone since 1892. Its grand architecture, complete with iconic holiday windows and a historic Walnut Room restaurant, offers an immersive shopping experience with everything from designer apparel to home goods (Macy's, 2025).
        </Typography>
        <Typography variant="body1" paragraph>
          Another landmark is Bloomingdale's at 900 North Michigan Avenue, known for its luxury fashion and beauty selections. This store exemplifies Chicago's upscale vibe, featuring exclusive brands like Gucci and Louis Vuitton, and hosts events like fashion shows and pop-up shops. Nearby, Nordstrom at 55 East Grand Avenue provides a contemporary twist with its personal styling services and vast shoe departments, making it a go-to for trendsetters.
        </Typography>
        <Typography variant="body1" paragraph>
          Water Tower Place, another key landmark at 835 North Michigan Avenue, houses a vertical mall with anchors like Apple and Forever 21, offering a mix of tech, fashion, and entertainment. For unique finds, don't miss the Chicago Place with its high-end retailers like Saks Fifth Avenue, which curates exclusive collections and provides personalized shopping experiences.
        </Typography>
        <Typography variant="body1" paragraph>
          Beyond the Magnificent Mile, the Block 37 shopping center at 108 North State Street integrates retail with public art, featuring stores like H&M and Sephora, while the historic Palmer House Hilton nearby offers luxury shopping pop-ups. These landmarks not only drive economic vitality but also reflect Chicago's evolution, adapting to e-commerce with features like online-to-in-store pickup.
        </Typography>
        <Typography variant="body1" paragraph>
          In essence, downtown Chicago's shopping scene is a vibrant tapestry of history and modernity, with these landmark stores fostering community and innovation. Whether you're bargain hunting or splurging on luxury, the area's accessibility via public transit and proximity to attractions like Millennium Park enhance the experience, solidifying its status as a retail mecca.
        </Typography>
        {/* End of change */}
      </Container>
      <Footer />
    </AppTheme>
  );
}