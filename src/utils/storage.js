export const setPlaylistItemsToLocalStorage = (playlistItems) => {
    if (window.localStorage) {
        try {
            localStorage.setItem('__cache__', JSON.stringify({
                saveTime: Date.now(),
                playlistItems,
            }));
        } catch (e) {
        }
    }
};

export const getPlaylistItemsFromLocalStorage = () => {
    if (window.localStorage) {
        try {
            return JSON.parse(localStorage.getItem('__cache__'));
        } catch (e) {
            return null;
        }
    }
};

export const setOriginPlaylistToLocalStorage = (playlist) => {
    if (window.localStorage) {
        try {
            localStorage.setItem('__origin_playlist__', JSON.stringify(playlist));
        } catch (e) {
        }
    }
};

export const getOriginPlaylistFromLocalStorage = () => {
    if (window.localStorage) {
        try {
            return JSON.parse(localStorage.getItem('__origin_playlist__'));
        } catch (e) {
            return null;
        }
    }
};

export const setMyPlaylistToLocalStorage = (playlist) => {
    if (window.localStorage) {
        try {
            localStorage.setItem('__playlist__', JSON.stringify(playlist));
        } catch (e) {
        }
    }
};

export const getMyPlaylistFromLocalStorage = () => {
    if (window.localStorage) {
        try {
            return JSON.parse(localStorage.getItem('__playlist__'));
        } catch (e) {
            return null;
        }
    }
};

export const setAppStateToLocalStorage = (state) => {
    if (window.localStorage) {
        try {
            localStorage.setItem('__state__', JSON.stringify(state));
        } catch (e) {
        }
    }
};

export const getAppStateToLocalStorage = () => {
    if (window.localStorage) {
        try {
            return JSON.parse(localStorage.getItem('__state__'));
        } catch (e) {
            return null;
        }
    }
};