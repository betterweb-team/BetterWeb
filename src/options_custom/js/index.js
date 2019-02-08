async function main() {
    //Retrieve stored settings
    var settings = await retrieve.getStoredSettings(allSettings);
}

window.addEventListener('load', main)