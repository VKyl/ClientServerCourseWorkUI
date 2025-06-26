import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Logo from "./../../assets/img.png";

const Header = () => {
  return (
    <AppBar position="static" color="secondary" elevation={2}>
      <Toolbar>
        <Box flexGrow={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: "15px", paddingY: "10px"}}>
          <img src={Logo} alt="logo" width={55} height={55} />
          <Typography variant="h6" component="div">
            InvestFolio
          </Typography>
        </Box>
        {/* Optional: Add buttons or links here */}
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
