import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  IconButton,
  Link,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}
const midLinks = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Catalog",
    path: "/catalog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const rightLinks = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Register",
    path: "/register",
  },
];

const navStyle = {
  color: "inherit",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
  textDecoration: "none",
};

export default function Header({ darkMode, handleThemeChange }: Props) {

  const { basket } = useAppSelector(state => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum += item.quantity, 0);

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display={"flex"} alignItems="center">
            <Typography variant="h6" component={Link} href="/" sx={navStyle}>
              RE-STORE
            </Typography>
            <Switch
              aria-label="Dark Mode"
              checked={darkMode}
              onChange={handleThemeChange}
            />
          </Box>

          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={Link}  href={path} key={path} sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>


          <Box display="flex" alignItems={"center"}>
            <IconButton href='/basket' size="large" color="inherit">
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyle}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
