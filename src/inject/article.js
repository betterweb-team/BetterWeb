import {Mercury} from '../shared/js/mercury.web.js';

window.onload = function () {
    Mercury.parse().then(result => {
        document.write(result.content);
    });
};
