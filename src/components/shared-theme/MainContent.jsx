import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { Collapse } from '@mui/material';
import { useState } from 'react';
import Link from '@mui/material/Link';
import { makeDynamic } from '../../../utils/dynamicWrapper';

const cardData = [
  {
    image:'/images/chicago_skyline_hancock.gif',
    tag: 'Beautiful Skyline',
    title: 'The city with 178 neighbourhoods',
    description:
      'Amazing aestetics and arcitecture in the heart of the USA will get you to new feel of beauty.Chicago is a city of diverse and vibrant neighborhoods, each with its own unique character, history, and culture. From the towering skyscrapers of the Loop to the artistic streets of Pilsen, and the historic brownstones of Lincoln Park to the lively music scene in Uptown, Chicago’s neighborhoods reflect a rich tapestry of communities. The South Side boasts deep cultural and historical significance, while the North Side features bustling commercial districts. The West Side is home to thriving arts and culinary scenes. Whether exploring Chinatown, Little Italy, or Bronzeville, Chicago’s neighborhoods offer a dynamic mix of tradition and modernity.',
    authors: [
      { name: 'D Yordanov', avatar: '/' ,time:'March 14, 2025'},
    ],
  },
  {
    image:'/images/24hours_sign.gif',
    tag: 'Bars',
    title: 'Bars',
    description:
    `Here are five popular bars in Chicago that are great for sightseeing while enjoying a drink: \n 1. **The Signature Lounge at the 95th**  
Located on the 95th floor of the John Hancock Center, this bar offers breathtaking panoramic views of the city skyline, Lake Michigan, and beyond.

2. **Cindy's Rooftop**  
With stunning views of Millennium Park and the Art Institute of Chicago, Cindy's Rooftop serves craft cocktails while providing a scenic perspective of the city's downtown area.

3. **The Aviary**  
This upscale bar in the West Loop not only offers innovative drinks but also provides a great view of the surrounding neighborhood, adding to its vibrant atmosphere.

4. **The Roof at The Wit**  
This rooftop bar features spectacular views of the Chicago skyline, ideal for a drink while taking in the city’s architectural beauty.

5. **Chicago Riverwalk Bars**  
Located along the scenic Chicago Riverwalk, these bars offer a relaxed atmosphere and excellent views of the river and iconic bridges, perfect for a day or evening of sightseeing.
    `,
    authors: [
      { name: 'D Petrov', avatar: '/' ,time:'March 18, 2025'},
    ],

  }
];

const StyledCardContent = styled(CardContent)({
  paddingBottom: "16px",
});

const StyledCard = styled(Card)({
  transition: "0.3s",
  cursor: "pointer",
  margin: "12px"
});



const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">{authors.map(author=>author.time)}</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

 function MainContentComponent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [expanded, setExpanded] = useState({});
 
  const handleToggle = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Chicago Tours
        </Typography>
        <Typography variant='h3'>Welcome to the city of Chicago. Here is some information about the city.</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          {/* <RssFeedRoundedIcon /> */}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
              {/* Below is beautifullTAB PAGES do add it when needed. DO NOT DELETE */}
 
          {/* <Chip onClick={handleClick} size="medium" label="All categories" /> */}
          {/* <Chip
            onClick={handleClick}
            size="medium"
            label="Company"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />

          /> */}
        </Box>
         {/* Below is beautifull search do add it when needed. DO NOT DELETE */}
        {/* <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box> */}
      </Box>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }} 
          style={{ width: '100%'}}
        >

    {cardData == undefined ? (
            <Typography>No data available</Typography>  // Fallback UI
          ) : cardData?.map((card,index) => (
      <StyledCard 
          key={index}
          variant="outlined" 
          onClick={()=>handleToggle(index)}
          ariant="outlined"
          onFocus={() => handleFocus(1)}
          onBlur={handleBlur}
          tabIndex={0}
          className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
          >
            {/* Collapsible Image */}
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardMedia
                component="img"
                alt="Chicago Skyline"
                image={cardData[index].image}
                sx={{
                  aspectRatio: "16 / 9",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
            </Collapse>

      {/* Card Content */}
      <StyledCardContent>
        <Typography gutterBottom variant="caption" component="div">
          {cardData[index]?.tag}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {cardData[index]?.title}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
        <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
          {cardData[index] == undefined ? (
            <Typography>No data available</Typography>  // Fallback UI
          ) : (
            cardData[index]?.description.split("\n").map((x,descIndex)=>{
            const item= x
            return (
              <ol key={descIndex}>
              {x}
              </ol>
            )
          }))}
        </Collapse>
        </StyledTypography>
      </StyledCardContent>

      {/* Author Section */}
      <Author authors={cardData[index]?.authors || [] } />
      </StyledCard>
    )

    )
      
    }
   
        </Grid>
        
      </Grid>
    </Box>
  );
}

const MainContent = makeDynamic(MainContentComponent);
export default MainContent;