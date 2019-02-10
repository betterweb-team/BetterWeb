const SETTINGS = {
    /**
     * Get settings from index.html
     * @returns {Object} An Object with all settings in html in the form {setting:value}
     */

    getSettings: function getSettings() {
        var settings = {};
        for (element of document.querySelectorAll("[setting]")) {
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