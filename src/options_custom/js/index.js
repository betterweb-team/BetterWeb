async function main() {
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

window.addEventListener('load', main)