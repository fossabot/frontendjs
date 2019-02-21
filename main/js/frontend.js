window.onload = function(){

  // Create Objects
  const
  header = new Nav("header"),
  nav = new Nav("nav"),
  main = new Element("main"),
  aside = new Element("aside"),
  footer = new Element("footer");

  // Add nodes to the body element.
  header.init(document.body);
  nav.init(document.body);
  main.init(document.body);
  aside.init(document.body);
  footer.init(document.body);

  // Set objects inner html?
  header.set([["#","Login"],["#","Signup"]]);
  nav.set([["#","Home"],["#","Community"]]);


  // Testing form
  const signupForm = new Form("signup");
  // How to add it into main? prototype signupForm.push(main.node); ???
  signupForm.init(document.body);
  // Maybe create labels if first param = "input" ?
  signupForm.add([ ["username"], ["password"], ["email"] ]);





// Test Button
  main.set([["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]);

  var testadd = document.getElementById("testadd");
  var testset = document.getElementById("testset");
  testadd.addEventListener("click",function(){
    nav.add(["#","Home"]);
  });
  testset.addEventListener("click",function(){
    nav.set([["#","hi"],["#","bye"]]);
  });



}// onload END
