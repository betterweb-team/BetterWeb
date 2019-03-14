window.addEventListener('load', function() {
    try {
        var parse = Mercury.parse(document.URL);
    } catch (err) {
        console.console.warn("Could not parse article");
    }

    parse.then(result => {
        console.log("%c" + result.title, "color: green");
    });
});