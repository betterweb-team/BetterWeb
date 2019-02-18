//import {Mercury} from '../../shared/js/mercury.web.js';

/*
 * Mercury content extraction page
 */
window.addEventListener('load',function () {
    Mercury.parse(document.URL).then(result => {
        console.log(result);
    });
});
