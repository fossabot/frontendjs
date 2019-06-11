var main = new Node(["main"]);
main.addM([
    ["h1", "frontendjs.org"],
    ["p", "Making the slideshow and improving the code overall."],
    ["a", { target:"_blank", href:"./javascript" }, "javascript folder"],
    ["br"],
    ["a", { target:"_blank", href:"./testing" }, "testing folder"]
]);
main.init();

var slideshow = new Slideshow(["case.jpg","pc.jpg"], { folder: "./testing/slideshow/" });
slideshow.init();