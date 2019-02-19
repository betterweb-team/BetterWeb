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
    document.querySelector(".apply").addEventListener("click", function(e) {
        var settings = SETTINGS.getSettings();
        retrieve.setSettings(settings)
    });

    document.querySelector(".settings_applied_message").addEventListener("animationend", function(e) {
        this.setAttribute("class", "settings_applied_message");
    });

    document.querySelector(".apply").addEventListener("click", function(e) {
        document.querySelector(".settings_applied_message").setAttribute("class","settings_applied_message fade_in_out");
    });
});

