// List of images
const images = ["green_building.jpg", "purple_lake.jpg", "blue_red_forest.jpg", "pink_park.jpg", "from_inside.jpg"];

// First slideshow (fullscreen)
const setup = {
  folder:"./images/", // folder location with a / at the end
  mode: "fullscreen", // cover, contain, fullscreen
  auto: 2000 // Changing speed of slideshow images.
};

const slideshow = new Slideshow(images, setup);
slideshow.init();


// Text for demo purposes. (not a part of slideshow)
const demo = createElement(["h1", { className:"demo" }, "Hello World!"]);
document.body.appendChild(demo);

// Second slideshow
const setup2 = {
  folder:"./images/",
  size:"400px 250px",
  controls: true
};

const slideshow2 = new Slideshow(images, setup2, {className:"smallSlideshow"});
slideshow2.init();