window.onload = function(){

  // Create Objects
  const
  header = new Nav("header"),
  nav = new Nav("nav"),
  main = new Element("main"),
  aside = new Element("aside"),
  footer = new Nav("footer");

  // Add nodes to the body element.
  header.init(document.body);
  nav.init(document.body);
  main.init(document.body);
  aside.init(document.body);
  footer.init(document.body);

  // Set objects inner html?
  header.set([["#","Login"],["#","Signup"]]);
  nav.set([["#","Home"],["#","Community"]]);
  footer.add(["https://github.com/damiantoczek/frontend", "Github"]);

  // Testing form
  const signupForm = new Form("signup");
  signupForm.init(main.node);
  // Maybe create labels if first param = "input" ?
  signupForm.add([ ["username"], ["password"], ["email"] ]);


// Test Button
  main.add([["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]);

  var testadd = document.getElementById("testadd");
  var testset = document.getElementById("testset");
  testadd.addEventListener("click",function(){
    nav.add(["#","We Love JS!"]);
  });
  testset.addEventListener("click",function(){
    nav.set([["#","U"],["#","Mad?"]]);
  });



}// onload END
