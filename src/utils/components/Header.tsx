import {AppBar, Toolbar, Typography, Box, Button} from '@mui/material';
import Logo from "./../../assets/img.png";
import WithAuth, {type WithInjectedAuth} from "../context/WithAuth.tsx";

const Header = (props: WithInjectedAuth) => {
  return (
    <AppBar position="static" color="secondary" elevation={2}>
      <Toolbar>
        <Box flexGrow={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: "15px", paddingY: "10px"}}>
          <img src={Logo} alt="logo" width={55} height={55} />
          <Typography variant="h6" component="div">
            InvestFolio
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => props.isAuthenticated ? props.logout() : void 0}>
          {props.isAuthenticated ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const HeaderComponent = WithAuth(Header);
export default HeaderComponent;
