import retrieve from "./retrieve";

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
        for (var element of document.querySelectorAll("[setting]")) {
            defaults[element.getAttribute("setting")] = element.getAttribute("default");
        };

        return defaults
    }
}

const startup = {
    
    /**
     * Sets undefined settings to their defaults
     * @param {Object} settings Object with settings to be checked in the form {setting:value}
     * @param {Object} df Object with settings defaults in the form {setting:default}
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
    /**
     * Applies retrieved settings to the settings page
     * @param {Object} settings Settings object
     */
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
        var settings = SETTINGS.getSettings();
        retrieve.setSettings(settings);
    });

    settingsAppliedMessage.addEventListener("animationend", function(e) {
        this.setAttribute("class", "settings_applied_message");
    });

    applyButton.addEventListener("click", function(e) {
        settingsAppliedMessage.setAttribute("class", "settings_applied_message fade_in_out");
    });
});

