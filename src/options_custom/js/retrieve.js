
const retrieve = {

    /**
     * Converts valid forms of settings into an Array of keys, to be sent to getStoredSettings
     * @param settings Settings to be parsed
     * @returns {Array} An array with all settings 
     */

    parseSettings: function parseSettings(settings) {
        if (Array.isArray(settings)) { // Array
            return settings;
        } else { // Arbritrary Object
            return Object.keys(settings)
        }
    },

    /**
     * Retrieves user settings from chrome.storage
     * @param {Array} settings An array of settings to get 
     * @returns {Promise<Object>} Promise that resolves to object with requested settings
     */

    getStoredSettings: async function getStoredSettings(settings) {
        res = {};
        for (i in settings) {
            v = settings[i];
            var setting = await new Promise(function requestSettings(resolve) {
                chrome.storage.local.get([v], function resolveResults(results) {
                    resolve(results);
                });
            });

            if (!setting[v]) {
                res[v] = null;
            } else {
                res[v] = setting[v];
            }
        }
        
        return res;
    },

    /**
     * Sets stored user settings to defaults defined in settings.js
     * @param {Object} settings An object for settings to set in the form {key: value}
     * @returns {Promise<undefined>} Promise that resolves when settings are applied 
     */

    setSettings: function setSettings(settings) {
        return new Promise(function requestSetSettings(resolve) {
            chrome.storage.local.set(settings, function resolveResults() {
                resolve();
            });
        });
    }  
}
