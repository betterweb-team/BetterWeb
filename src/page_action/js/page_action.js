function renderPopup(data) {
    if (!data.match) { return }
    document.querySelector("html").innerHTML = data.data.bias + " " + data.data.factual;
}

window.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, { from: 'popup', subject: 'getData' },
            renderPopup);
    });
});