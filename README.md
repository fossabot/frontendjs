# frontend.js

### Hello World example

1. Create a element node (parent)
```var main = new Element(["main"]);```
2. Add a child node to the parent node.
```main.add(["p", "Hello World!"]);```
3. Initialize/render the parent element.
```main.init();```
The `init()` method can be used after or before the `add` method.
