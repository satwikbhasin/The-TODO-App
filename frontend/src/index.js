import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styling/index.css';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/main/Navbar';
import Base from './components/main/Base';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { lightTheme, darkTheme } from './themes';
import { getThemeFromCookie, setThemeInCookie } from './methods/cookieOperations';

const App = () => {
  const initialTheme = getThemeFromCookie();
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setThemeInCookie(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: isDarkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
      }}>
        <Navbar toggleTheme={toggleTheme} />
        <Base />
      </div>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);