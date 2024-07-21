import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { lightTheme, darkTheme } from './themes';
import { getThemeFromCookie, setThemeInCookie } from './methods/cookies';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Navbar from './components/main/Navbar';
import AppRouter from './components/main/AppRouter';

/**
 * Main application component.
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
    const initialTheme = getThemeFromCookie();
    const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

    /**
     * Function to toggle theme mode and update cookie.
     */
    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setThemeInCookie(newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <AuthProvider>  {/* Provides authentication context */}
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> {/* Applies the current theme */}
                <Router>    {/* Router component for handling navigation */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100vw',
                        height: { xs: '100vh', md: '100vh' },
                        background: isDarkMode
                            ? darkTheme.palette.background.main
                            : lightTheme.palette.background.main,
                    }}>
                        <Navbar toggleTheme={toggleTheme} />    {/* Navbar with theme toggle callback function */}
                        <Container sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <AppRouter />   {/* Component for rendering the current route */}
                        </Container>
                    </div>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;