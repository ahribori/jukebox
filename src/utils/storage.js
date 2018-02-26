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