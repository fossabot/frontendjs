"use strict";

class Node{
    constructor( element ){
        if( typeof element == "string" ) this.node = document.createElement( element );
        else this.node = this.createSingleNode( element );
    }

    createSingleNode( array ){
        /*
            ["div",{ className: "hello" }, "textNode"]
            <div class="hello">textNode"</div>

            ["div",{ className: "hello" }, ["p", "text"] ]
            <div class="hello"><p>textNode</p></div>
        */

        let node = document.createElement( array[0] ); // Let node be the parent element node.

        // Handle normal arrays like:
        // ["div", "my Div"];
        for( let i = 1, l = array.length; i < l; i++ ){ // Loop thru the single array and get all the values like string, objects and arrays.

            // If the value is an array, append the created node to the parent node.
            if( array[i] instanceof Array ) node.appendChild( this.createSingleNode(array[i]) );

            // If the array[i] is a object, it's a list of attributes, add those attributes to the created element node.
            if( typeof array[i] === "object" ){
                // If the array[i] is an object, loop thru the object and add the key:array[i] pairs as attributes to the node element. (object)
                for( let value of Object.keys( array[i] ) ) node[ value ] = array[i][value];
                continue;
            }

            // If string is a node (except [0]) create a text node.
            if( typeof array[i] === "string" ) node.appendChild( document.createTextNode( array[i] ) ); // else if, the array[i] is a string and the node variable has been set, create a text node and append it to the parent node.

        }

        // Return a node element.
        return node;
    }

    createMultipleNodes( array ){
        // Multi node.
        // let nodes = createMultipleNodes([
        //     ["div", { className: "hello" }, "Hello"],
        //     ["div", { className: "world" }, "World!"]
        // ]);
        // console.log(nodes);
        // for( let value of nodes ){
        //     document.body.appendChild( value );
        // }
        // <div class"hello">Hello</div><div class="world">World!</div>

        let node = [];
        // Handling multidimensional arrays like:
        // [["div", "My Div."], ["p", "My paragraph."]];
        if( array[0] instanceof Array ){ // If the first value is an array...

            for( let i = 0, l = array.length; i < l; i++ ) node.push( this.createSingleNode( array[i] ) ); // Loop thru the array, get the values that are array and loop them into the node variable.
            return node; // Return an array of created node elements.
            // Info: Needs a loop to be appended:
            // myNodes.forEach(function(node){ document.body.appendChild(node); });
        }

        return node;
    }

    // Append this element to the targetNode.
    init( targetNode = document.body ){
        targetNode.appendChild( this.node );
    }

    // Append this element to a node.
    initNode( nodeName ){
      nodeName.node.appendChild( this.node );
    }

    // Append this element to a id element.
    initId( idName ){
      document.getElementById( idName ).appendChild( this.node );
    }

    // Append this element to a tag element.
    initTag( tagName ){
      document.getElementsByTagName( tagName )[0].appendChild( this.node );
    }

    // Removes all child nodes from within the parent (this.node) element.
    clear(){
        while( this.node.lastChild ) this.node.removeChild( this.node.lastChild );
    }

    // Add a single node to this.node.
    // Look createSingleNode function above.
    addS( array ){
        this.node.appendChild( this.createSingleNode(array) );
    }

    // Add multiple nodes to this.node.
    // Look createMultipleNodes function above.
    addM( array ){
        for( let node of this.createMultipleNodes(array) ) this.node.appendChild(node);
    }

    // Clear the node before adding nodes.
    set( array ){
        this.clear();
        if( array[0] instanceof Array ) this.addM( array );
        return this.addS( array );
    }

    // Add a text node to this.node.
    text( string ){
        this.node.appendChild( document.createTextNode(string) );
    }

    // Clear this.node before adding a text node.
    setText( string ){
        this.clear();
        this.text(string);
    }

    on( method, func ){
      this.node.addEventListener(method, function(){
        func();
      });
    }
}

class Form extends Node{
    constructor( attr ){
        super(["form", attr]);
    }

    submit( callback ){
        this.node.addEventListener("submit", e => {
            e.preventDefault();
            callback();
        });
    }
}

class Img{
    constructor(){
        this.node = document.createElement("img");
    }

    // Append this element to the targetNode.
    init( targetNode = document.body ){
        targetNode.appendChild( this.node );
    }

    // Load/change the image source. (String)
    load( path ){
        this.node.src = path;
    }
}

class Slideshow extends Node{
    constructor( images, config ){
        super(["slideshow"]);
        this.images = images; // store images so other methods have access to them.
        this.config = config; // store config ^
        this.index = 0; // keep track of the image that is showing.
        this.img = new Img(); // create a empty image node.
        this.img.load( config.folder + this.images[0] ); // load the first image as default.

        // MAIN image container .ssmain
        this.wrap = document.createElement("div");
        this.wrap.className = "ssmain";
        this.prevButton = this.createSingleNode(["button", "<"]);
        this.nextButton = this.createSingleNode(["button", ">"]);

        // show the next picture when "nextButton" is clicked.
        this.nextButton.addEventListener("click", () => {
            this.next();
        });

        // show the previous picture when "prevButton" is clicked.
        this.prevButton.addEventListener("click", () => {
            this.prev();
        });

        // append nodes together.
        this.wrap.appendChild( this.prevButton );
        this.wrap.appendChild( this.img.node );
        this.wrap.appendChild( this.nextButton );

        // THUMBNAILS .ssthumbnails
        this.thumbnails = document.createElement("div");
        this.thumbnails.className = "ssthumbnails";

        // loop thru the image array to create thumbnails.
        for( let i = 0, l = this.images.length; i < l; i++ ){
            // create a thumbnail image element.
            let img = document.createElement("img");

            // add the index position inside the array of this image as a value.
            img.dataset.index = i;

            // add image src path to the thumbnail images.
            img.src = this.config.folder + this.images[i];

            // add a click event listener on all thumbnail images.
            img.addEventListener("click", () => {
                let index = img.dataset.index; // let index be the dataset index of thumbnail images.
                this.img.load( this.config.folder + this.images[ index ] ); // load the thumbnail image inside the main image.
                this.index = parseInt(index); // set the slideshow index to the thumbnail index. Must be parsed as int.
            });

            // add images(thumbnails) to the thumbnail container.
            this.thumbnails.appendChild( img );
        }

        // append nodes together.
        this.node.appendChild( this.wrap );
        this.node.appendChild( this.thumbnails );
    }

    next(){
        if( this.index < this.images.length - 1 ){
            this.index = this.index + 1;
            this.img.load( this.config.folder + this.images[ this.index ] );
        }
    }

    prev(){
        if( this.index !== 0 ){
            this.index = this.index - 1;
            this.img.load( this.config.folder + this.images[ this.index ] );
        }
    }
}
