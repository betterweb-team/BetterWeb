import retrieve from "./retrieve";

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
            <div class="source_bias_container">
                <p class="title">Political Bias</p>
                <div class="source_bias_meter">
                    
                    <div class="hor_line"></div>
                    <div class="bias_message">
                        &#9650 <br> ${biasData.bias}
                </div>
                </div>
            </div>
            <div class="source_reliability_container">
                <p>Reliability: ${biasData.factual}</p>
            </div>
        </div>
        `;
        body.setAttribute("id", "biasPanel");

        const bias_message = document.querySelector(".source_bias_meter .bias_message");
        const reliability_container = document.querySelector(".source_reliability_container");

        //Animations
        setTimeout(() => {
            //Bias meter placement
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

            //Reliabilty styling
            var reliability_color;
            switch (biasData.factual) {
                case "HIGH":
                    reliability_color = "green";
                    break;
                case "LOW":
                    reliability_color = "red";
                    break;
                default:
                    reliability_color = "rgb(221, 181, 32)";
            }
            reliability_container.style.color = reliability_color;
            reliability_container.style.borderColor = reliability_color;
        }, 250);
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