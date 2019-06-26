# FrontendJS

Frontendjs is a small javascript library to create single-page applications.

### Hello World example
1. Create the parent node  
```var main = new Node("main");```  
2. Add a child node to the parent node.  
```main.addS(["p", "Hello World!"]);```  
3. Initialize/render the parent element.  
```main.init();```  
The `init()` method can be used after or before the `addS` method.

### Basics Node
Nodes are created with the use of arrays. The first string of an array, will become the tagname.  
```
["abcdefg"]
// <abcdefg></abcdefg>
```
Each following string (after the "abcdefg") will become a text node.
```
["abcdefg", "Hi", " there"]
// <abcdefg>Hi there</abcdefg>
```
An object will represent the attributes of your node. (JS syntax applies)
To add a class attribute, use `className` as a key.
```
["abcdefg", "Hi", " there", {className: "myWeirdTagname"}]
// <abcdefg class="myWeirdTagname">Hi there</abcdefg>
```
When creating a new class instance, for example `new Node();` you don't need to use an array to create a new element, but only if you don't need any attributes etc.
`new Node("div")`

### How do I create a parent node?
```
var container = new Node("div");
// <div></div>
var container = new Node(["div", {id:"container"}];
// <div id="container"></div>
```
to show the parent node:  
`container.init();`

### How do I add nodes to the parent node?
addS = "S" stands for single (node)
```
container.addS(["p", "Hello World!"]);
// <div id="container">
//   <p>Hello World!</p>
// </div>
```
addM = "M" stands for multiple (nodes).
```
container.addM([
  ["p", "Hello World!", {className: "shoutOut"}],
  ["p", "Welcome to my page!", {className: "greeting"}]
]);
// <div id="container">
//   <p class="shoutOut">Hello World!</p>
//   <p class="greeting">Welcome to my page!</p>
// </div>
```

### How do I add a parent node to another parent node?
Lets use the `var container` node from above. To add a new parent node to another node you do the following:
```
var header = new Node("header");
header.init( myDiv.node );
// <div>
//   <header></header>
// </div>
```
The `container` variable is the class instance and `container.node` is the element reference of the created HTML tag element.

If it's a element that hasn't been created by frontendjs, you can also use the ID of that element.
```
header.initId("container");
// <div id="container">
//   <header></header>
// </div>
```

### myElement.node
All the class methods do one thing, all of them use the `node` property of the `Node` class.
If you don't feel like using the `addS` and `addM` methods, you can directly manipulate the node.
```
myDiv.node.appendChild = createTextNode("Hello World!");
// <div>Hello World!</div>
```

### Add nested elements
```
myDiv.addS("p");
// <div><p></p></div>
myDiv.addS(["p", ["span", "Hello"], ["span", "World!"]]);
// <div><p><span>Hello</span><span>World!</span></p></div>
```
If you're curious what the limit is, there isn't any limit :)
```
main.addS(["p", "TEST paragraph",
            ["p", "A",
               ["p", "B",
                 ["p", "C",
                   ["p", "D",
                     ["p", "E"]
                   ]
                 ]
               ]
             ]
           ]);
```
You can also nest elements when creating a new parent node.
```
var goCrazy = new Node(["p", "xD", ["p", "A", ["p", "B", ["p", "C", ["p", "D", ["p", "E"]]]]]]);
```
