import Cookies from 'js-cookie';

export const getThemeFromCookie = () => {
    const theme = Cookies.get('todoApp-theme');
    return theme ? theme : 'dark';
};

export const setThemeInCookie = (theme) => {
    Cookies.set('todoApp-theme', theme, { expires: 365 });
};