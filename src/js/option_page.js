const SETTINGS = {
    /**
     * Get settings from index.html
     * @returns {Object} An Object with all settings in html in the form {setting:value}
     */

    getSettings: function getSettings() {
        var settings = {};
        for (var element of document.querySelectorAll("[setting]")) {
            settings[element.getAttribute("setting")] = element.getAttribute("state");
        };

        return settings
    },

    /**
     * Get settings defaults from index.html
     * @returns {Object} An Object with all settings defaults in html in the form {setting:default}
     */

    getDefaults: function getDefaults() {
        var defaults = {};
        for (element of document.querySelectorAll("[setting]")) {
            defaults[element.getAttribute("setting")] = element.getAttribute("default");
        };

        return defaults
    }
}


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
        for (var i in settings) {
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

const startup = {
    
    /**
     * Sets undefined settings to their defaults
     * @param {Object} settings Object wtih settings to be checked in the form {setting:value}
     * @param {Object} default Object wtih settings defaults in the form {setting:default}
     * @returns {Object} Promise that resolves with fixed settings object
     */

    fixedSettings: function fixedSettings(settings, df) {
        retrieve.parseSettings(settings).forEach(v => {
            if (settings[v] === null || settings[v] === undefined) {
                settings[v] = df[v];
            }
        })

        return settings;
    },

    applySettings: function applySettings(settings) {
        Object.keys(settings).forEach(element => {
            document.querySelector("[setting=" + element + "]").setAttribute("state", settings[element])
        });
    }
}

async function main1() {
    "use strict";
    //Retrieve stored settings
    var settingsList = SETTINGS.getSettings();
    var defaultsList = SETTINGS.getDefaults();
    settingsList = await retrieve.getStoredSettings(retrieve.parseSettings(settingsList));

    //Fix undefined settings (for new user)
    settingsList = startup.fixedSettings(settingsList, defaultsList);

    //Apply stored settings
    startup.applySettings(settingsList);
}

window.addEventListener('load', main1)

window.addEventListener('load', function main() {
    "use strict";

    // Checkbox events
    for (var element of document.querySelectorAll(".checkbox")) {
        element.addEventListener("click", function(e) {
            if (this.getAttribute("state") == "true") {
                this.setAttribute("state", "false");
            } else {
                this.setAttribute("state", "true");
            }
        });
    }

    // Apply button events
    var applyButton = document.querySelector(".apply");
    var settingsAppliedMessage = document.querySelector(".settings_applied_message");

    applyButton.addEventListener("click", function(e) {
        var settings = window.SETTINGS.getSettings();
        retrieve.setSettings(settings)
    });

    settingsAppliedMessage.addEventListener("animationend", function(e) {
        this.setAttribute("class", "settings_applied_message");
    });

    applyButton.addEventListener("click", function(e) {
        settingsAppliedMessage.setAttribute("class", "settings_applied_message fade_in_out");
    });
});

