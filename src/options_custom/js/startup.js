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