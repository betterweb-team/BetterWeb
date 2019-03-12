function getBiasData(hostName) {
    return new Promise(function(resolve) {
        chrome.storage.local.get(['media_urls'], function(result) {
            var websites = JSON.parse(result.media_urls).media_urls;
            var website = websites[hostName]; //This is an array with [0] as data!
            if (website === void 0) { // Page not listed 
                resolve(void 0)
            } else {
                resolve(website[0]);
            }
        });
    });
}

async function renderPopup(data) {
    var biasData = await getBiasData(data.hostname);
    if (biasData) {
        const body = document.querySelector("body");
        body.innerHTML =
            `
        <div class="source_bias">
            <h1>Source Bias for ${biasData.name}</h1>
            <div class="source_bias_meter">
                <div class="hor_line"></div>
                <div class="bias_message">
                    &#9650 <br> ${biasData.bias}
                </div>
            </div>
            <p>Reliability: ${biasData.factual}</p>
        </div>
        `;
        body.setAttribute("id", "biasPanel");

        //Bias meter placement
        const bias_message = document.querySelector(".source_bias_meter .bias_message");
        switch (biasData.bias) {
            case "left":
                bias_message.style.left = "-10%";
                break;
            case "leftcenter":
                bias_message.style.left = "15%";
                break;
            case "rightcenter":
                bias_message.style.left = "65%";
                break;
            case "right":
                bias_message.style.left = "90%";
                break;
            default:
                bias_message.style.left = "40%";
                break;
        }

    }

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