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
        retrieve.setSettings(settings)
    });

    settingsAppliedMessage.addEventListener("animationend", function(e) {
        this.setAttribute("class", "settings_applied_message");
    });

    applyButton.addEventListener("click", function(e) {
        settingsAppliedMessage.setAttribute("class", "settings_applied_message fade_in_out");
    });
});

