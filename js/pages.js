function loadPage(){
  // Get the URL hash and delete the hashtag symbol
  let hash = location.hash.replace("#","");
  // Set the document title.
  document.title = `${conf.domain} - ${hash}`;
  // Check if hash isn't empty. If not then load a page.
  if( hash != "" ){
    page[ hash ]();
    return;
  }
  // If the statement above was false, it will load the home page.
  page["home"]();

}

window.addEventListener("hashchange", function(){
  loadPage();
});

window.onload = function(){
  loadPage();
}

var page = {
  home(){
    document.body.style.background = "#fff";
    main.set([
      ["h1", "Welcome to frontend.js ;_;"],
      ["p", "I'm a hobby coder and this is my project."],
      ["p", "Feel free to give me some feedback <3"],
      ["a", { href:"https://github.com/damiantoczek/frontendjs" }, "Github (>.<)"]
    ]);

  },
  signup(){
    main.clear();

    document.body.style.background = "linear-gradient(160deg, blue, red)";
    document.body.style.backgroundRepeat = "no-repeat";

    // create a form instance
    let form = new Form({ className:"signup"});
    form.add([
      ["h1", "frontend.js"],
      ["fieldset",
        ["input", { type:"username", placeholder:"username"}],
        ["input", { type:"password", placeholder:"password"}],
        ["input", { type:"text", placeholder:"email"}],
        ["input", { type:"submit", value:"Send" }]
      ]
    ]);

    form.init( main.node );

    form.submit(()=>{
      console.log("Form has been sent!");
    });


  },
  slideshow(){
    document.body.style.background = "#fff";

    var slideshow = new Slideshow([
      "case.jpg", "pc.jpg"
    ],{ controls: true, folder:"./src/" });

    // clear main.
    main.clear();
    // Init slideshow
    slideshow.init( main.node );
    // add header.
    main.add(["h1", "Slideshow"]);
  }
}
