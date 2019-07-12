var div = new Element(["div"]);
div.add([
    ["h1", "Slideshow example"],
    ["p", "Feedback is welcome!"]
]);
div.initId('test');

var slideshow = new Slideshow(["case.jpg","pc.jpg"], { folder: "./img/" });
slideshow.init();
