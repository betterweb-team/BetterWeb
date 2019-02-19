async function main() {
    "use strict";
    //Retrieve stored settings
    var settingsList = SETTINGS.getSettings();
    var defaultsList = SETTINGS.getDefaults();
    settingsList = await retrieve.getStoredSettings(retrieve.parseSettings(settingsList));

    //Fix undefined settings (for new user)
    settingsList = startup.fixedSettings(settingsList, defaultsList);

    //Apply stored settings
    startup.applySettings(settingsList)

    //Settings applied message
    var appliedButton = document.querySelector('.apply');
    var appliedMessage = document.querySelector('.settings_applied_message');

    appliedMessage.style.opacity = 0.;
    appliedButton.addEventListener("click", function(_){
        appliedMessage.classList.remove('fade_out_transition');
        appliedMessage.style.opacity = 1.;

        // Apparently the operations are non-blocking or something?
        setTimeout(() => {
            appliedMessage.classList.add('fade_out_transition');
            appliedMessage.style.opacity = 0.;
        }, 50);
    });
}

window.addEventListener('load', main)