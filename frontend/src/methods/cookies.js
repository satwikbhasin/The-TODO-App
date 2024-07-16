import Cookies from 'js-cookie';

export const getThemeFromCookie = () => {
    const theme = Cookies.get('todoApp-themePreference');
    return theme ? theme : 'dark';
};

export const setThemeInCookie = (theme) => {
    Cookies.set('todoApp-themePreference', theme, { expires: 365, path: '/' });
};