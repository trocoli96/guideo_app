export const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getFromLocalStorage = key => {
    if (localStorage.getItem(key) !== null) {
        return (localStorage.getItem(key) || '{}');
    }
};

const TOKEN_KEY = 'TOKEN_KEY';

export const saveToken = (token) => {
    saveInLocalStorage(TOKEN_KEY, token.access_token);
};

export const getToken = () => {
    return getFromLocalStorage(TOKEN_KEY);
};