window.addEventListener('load', function main() {
    "use strict";

    // Chackbox events
    for (var element of document.querySelectorAll(".checkbox")) {
        element.onclick = function(e) {
            if (this.getAttribute("state") == "true") {
                this.setAttribute("state", "false");
            } else {
                this.setAttribute("state", "true");
            }
        }
    }

    // Apply button events
    document.querySelector(".apply").onclick = function(e) {
        var settings = SETTINGS.getSettings();
        retrieve.setSettings(settings)
    }
});

