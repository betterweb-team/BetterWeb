
const retrieve = {
    /**
     * Retrieves user settings from chrome.storage
     * @param {Object} settings Settings to be set to deafult
     * @returns {Promise} Promise that resolves to settings object
     */

    getStoredSettings: function getStoredSettings(settings) {
        return new Promise(function requestSettings(resolve) {
            chrome.storage.local.get(Object.keys(settings), function returnResults(results) {
                resolve(results);
            });
        });
    },

    /**
     * Sets stored user settings to deafults defined in settings.js
     * @param {Object} settings Settings to be set to deafult
     * @returns {Promise} Promise that resolves when settings are applied 
     */

    setSettingsToDeafult: function setSettingsToDeafult(settings) {
        var settingsObj = {};
        Object.keys(settings).forEach(element => {
            settingsObj[element] = settings[element].deafult;
        });

        return new Promise( function(resolve) {
            chrome.storage.local.set(settingsObj, function cb() {
                resolve();
            });
        });
    }
}
