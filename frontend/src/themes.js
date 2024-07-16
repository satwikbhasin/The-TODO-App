import { createTheme } from '@mui/material/styles';

const themeSwitch = (mode) => {
    const commonStyles = {
        "&:hover": {
            backgroundColor: "inherit",
        },
    };

    const checkedStyles = {
        color: "#E2DFD2",
        "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#E2DFD2",
        },
    };

    const thumbBackgroundImage = mode === 'light'
        ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FFC300" stroke="%23FFC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>')`
        : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F2613F" stroke="%23F2613F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>')`;

    return {
        switchBase: {
            ...commonStyles,
            "&.Mui-checked": checkedStyles,
        },
        thumb: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: mode === 'light' ? "#0C0C0C" : "#E2DFD2",
            "&:before": {
                content: '""',
                display: 'block',
                width: '70%',
                height: '70%',
                backgroundImage: thumbBackgroundImage,
            },
        },
    };
};

const genericButton = (mode) => {
    return {
        root: {
            backgroundColor: mode === 'light' ? "#E2DFD2" : "#0C0C0C",
            color: mode === 'light' ? "#0C0C0C" : "#E2DFD2",
            "&:hover": {
                backgroundColor: mode === 'light' ? "#c6c5b9" : "#46494c",
            },
        },
    };
}

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#E2DFD2',
        },
        secondary: {
            main: '#c9c5b1',
            heading: '#0C0C0C',
            text: '#E2DFD2',
            icons: "#F2613F",
            misc: '#D84A05',
        },
        background: {
            main: 'linear-gradient(196deg, rgba(110,41,13,0.9542410714285714) -15%, rgba(114,114,114,1) 100%)',
            glassmorphism: "rgba( 0, 0, 0, 0.15 )"
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiSwitch: {
            styleOverrides: themeSwitch('light'),
        },
        MuiButton: {
            styleOverrides: genericButton('light'),
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0C0C0C',
        },
        secondary: {
            main: '#1e1e1e',
            heading: '#E2DFD2',
            text: '#E2DFD2',
            icons: "#F2613F",
            misc: '#D84A05',
        },
        background: {
            main: 'linear-gradient(196deg, rgba(110,41,13,0.9542410714285714) 0%, rgba(12,12,12,1) 74%)',
            glassmorphism: "rgba(255, 255, 255, 0.12)"
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiSwitch: {
            styleOverrides: themeSwitch('dark'),
        },
        MuiButton: {
            styleOverrides: genericButton('dark'),
        },
    },
});

export { lightTheme, darkTheme };