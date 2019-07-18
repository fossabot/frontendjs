var slideshow = new Slideshow(
    ["case.jpg","pc.jpg"],
    { folder: "./img/", controls: true, thumbnails: true }
);
slideshow.init();

var test = document.createElement("img");
document.body.appendChild(test);