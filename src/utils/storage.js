export const setPlaylistItemsToLocalStorage = (playlistItems) => {
    localStorage.setItem('__cache__', JSON.stringify({
        saveTime: Date.now(),
        playlistItems,
    }));
};

export const getPlaylistItemsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('__cache__'));
};