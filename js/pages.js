var template = {
  text( title, text ){
    let arr = [];
    for( let string of text ) arr.push(["p", string]);
    return ["section", ["h2", title], ...arr];
  },
  code( title, code ){
    let arr = [];
    for( let string of code ) arr.push(["code", string]);
    return ["section", ["h2", title], ["pre", ...arr]];
  }
};
var page = {
  home(){
    main.set(["h1", "WELCOME TO NARNIA"]);

    main.add(
      template.text("Few words",
      [
        "Don't use frontendjs in production, this is a fun project of mine and I've rewritten the code four times in the past few weeks."
      ])
    );

    main.add(["h2", "Examples"]);

    main.add(
      template.code("Hello World!",
        [
          "var greeting = new Element(['p', 'Hello World!']);",
          "greeting.init();"
        ])
    );
  },
  about(){
    main.set(["h1", "About"]);
    main.add([["p", "Nothing in here :("]]);
  }
}
