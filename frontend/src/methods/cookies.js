/**
 * @file This file contains methods related to handling cookies for theme preferences.
 */

import Cookies from 'js-cookie';

/**
 * Retrieves the theme preference from a cookie.
 * @returns {string} The theme preference stored in the cookie, or 'dark' if the cookie is not found.
 */
export const getThemeFromCookie = () => {
    const theme = Cookies.get('todoApp-themePreference');
    return theme ? theme : 'dark';
};

/**
 * Sets the theme preference in a cookie.
 * @param {string} theme - The theme preference to be stored in the cookie.
 */
export const setThemeInCookie = (theme) => {
    Cookies.set('todoApp-themePreference', theme, { expires: 365, path: '/' });
};