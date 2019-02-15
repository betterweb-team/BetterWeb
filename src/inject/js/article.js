import {Mercury} from '../../shared/js/mercury.web.js';

window.addEventListener('load',function () {
    Mercury.parse().then(result => {
        document.write(result.content);
    });
});
