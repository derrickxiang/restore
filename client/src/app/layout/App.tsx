import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import { Product } from "../models/Product";
import Header from "./Header";


function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background:{
        default:  (paletteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
         <Route exact path='/' component={HomePage} />
         <Route path='/about' component={AboutPage} />
         <Route exact path='/catalog' component={Catalog} />
         <Route exact path='/catalog/:id' component={ProductDetail} />
         <Route path='/contact' component={ContactPage} />
         
      </Container>
      
      
    </ThemeProvider>
  );
}

export default App;
