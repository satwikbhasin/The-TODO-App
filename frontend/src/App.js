import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { lightTheme, darkTheme } from './themes';
import { getThemeFromCookie, setThemeInCookie } from './methods/cookies';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Navbar from './components/main/Navbar';
import AppRouter from './components/main/AppRouter';

const App = () => {
    const initialTheme = getThemeFromCookie();
    const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setThemeInCookie(newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <AuthProvider>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <Router>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: isDarkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                    }}>
                        <Navbar toggleTheme={toggleTheme} />
                        <Container sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <AppRouter />
                        </Container>
                    </div>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;