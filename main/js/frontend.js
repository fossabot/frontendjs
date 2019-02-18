window.onload = function(){
  const header = {
    init(){
      document.body.appendChild(create(["header"]));
      this.node = document.getElementsByTagName('header')[0];
    },
    add(x){
      x.loop(function(p){
        header.node.appendChild(create(["a", {href:p[0]}, p[1]]));
      });
    },
    set(x){
      while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
      this.add(x);
    }
  }

  const nav = {
    init(){
      document.body.appendChild(create(["nav"]));
      this.node = document.getElementsByTagName('nav')[0];
    },
    add(x){
      x.loop(function(p){
        nav.node.appendChild(create(["a", {href:p[0]}, p[1]]));
      });
    },
    set(x){
      while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
      this.add(x);
    }
  }

  const main = {
    init(){
      document.body.appendChild(create(["main"]));
      this.node = document.getElementsByTagName('main')[0];
    },
    set(x){
      while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
      this.node.appendChild(create(x));
    }
  }

  const aside = {
    init(){
      document.body.appendChild(create(["aside"]));
      this.node = document.getElementsByTagName('aside')[0];
    },
    set(x){
      while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
      this.node.appendChild(create(x));
    }
  }

  const footer = {
    init(){
      document.body.appendChild(create(["footer"]));
      this.node = document.getElementsByTagName('footer')[0];
    },
    set(x){
      while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
      this.node.appendChild(create(x));
    }
  }

  // INIT();
  header.init();
  nav.init();
  main.init();
  aside.init();
  footer.init();

  // SET
  header.set([["#","Login"],["#","Signup"]]);
  nav.set([["#","Home"],["#","Community"]]);

  // TEST
  main.set(["a", {href: "#", id: "btn"}, "click or die"]);
  var test = document.getElementById("btn");
  test.addEventListener("click",function(){
    nav.set([["#","potato"],["#","LUL"]]);
  });
}// onload END
