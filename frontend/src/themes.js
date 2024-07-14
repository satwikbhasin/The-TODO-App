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

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#E2DFD2',
        },
        secondary: {
            main: '##DAF7A6',
            text: '#0C0C0C',
        },
        icons: {
            main: '#F2613F',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiSwitch: {
            styleOverrides: themeSwitch('light'),
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
            text: '#E2DFD2',
        },
        icons: {
            main: '#F2613F',
        },
        buttons: {
            main: '#D84A05',
            hover: '#F2613F',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiSwitch: {
            styleOverrides: themeSwitch('dark'),
        },
    },
});

export { lightTheme, darkTheme };