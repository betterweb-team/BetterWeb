async function main() {
    //Retrieve stored settings
    var settingsList = SETTINGS.getSettings();
    console.log(settingsList)
    var defaultsList = SETTINGS.getDefaults();
    settingsList = await retrieve.getStoredSettings(retrieve.parseSettings(settingsList));

    console.log(settingsList)
    console.log(settingsList, defaultsList)

    //Fix undefined settings (for new user)
    settingsList = startup.fixedSettings(settingsList, defaultsList);

    console.log(settingsList)

    //Apply stored settings
    startup.applySettings(settingsList)
}

window.addEventListener('load', main)