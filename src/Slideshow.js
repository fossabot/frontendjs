class Slideshow {
  constructor (images, setup, attr){
    this.node = document.createElement("DIV");
    this.wrap = document.createElement("WRAP");
    this.img = document.createElement("DIV");
    this.images = images; // Store all images
    this.index = 0; // Index of images.
    this.cache = Array();
    this.setup = Object();
    this.imgSize = Array();
    this.imgMode = String();

    this.img.style.backgroundPosition = "center";
    this.img.style.backgroundRepeat = "no-repeat";
    this.img.style.backgroundSize = "cover";

    // If setup is not defined, set default values.
    if(!setup){
      if(!setup.size){
        this.size("100vw 100vh");
      }

      if(!setup.mode){
        this.mode("cover");
      }
    }
    // Handle setup
    else{
      this.setup = setup;
      if(setup.mode === "fullscreen"){
        this.size("100vw 100vh");
        this.mode("cover");
        this.node.style.position = "absolute";
        this.node.style.zIndex = "-1";
        this.node.style.top = "0";
        this.node.style.left = "0";
      }else{
        this.size(setup.size);
        this.mode(setup.mode);
      }
    }

    // Handle setup controls (boolean)
    if(setup.controls){
      this.wrap.style.display = "inline-flex";
      
      // Previous button
      this.previousButton = document.createElement("BUTTON");
      this.previousButton.textContent = "<";
      this.previousButton.addEventListener("click", ()=>{
        if(this.index > 0){
          --this.index;
          this.load();
        }
      });
  
      // Next button
      this.nextButton = document.createElement("BUTTON");
      this.nextButton.textContent = ">";
      this.nextButton.addEventListener("click", ()=>{
        if(this.index < this.images.length-1){
          ++this.index;
          this.load();
        }
      });

      this.wrap.appendChild(this.previousButton);
      this.wrap.appendChild(this.img);
      this.wrap.appendChild(this.nextButton);
    }else{
      this.wrap.appendChild(this.img);
    }

    if(setup.auto){
      for(const path of this.images){
        this.pushCache(path);
      }

      setInterval(()=>{
        if(this.index < this.images.length-1){
          ++this.index;
        }else{
          this.index = 0;
        }
        this.load();
      }, setup.auto);
    }

    // Add attributes to the div node.
    if(attr){
      const key = Object.keys(attr);
      const value = Object.values(attr);
      for(let i = 0; i < key.length; i++){
        this.node[key[i]] = value[i];
      }
    }

    // Load the first image of index 0.
    this.load();

    this.node.appendChild(this.wrap);
  }

  load (){
    this.img.style.backgroundImage = `url(${this.setup.folder + this.images[this.index]})`;
    if(this.cache.length !== this.images.length){
      this.pushCache(this.images[this.index]);
    }
  }

  size (string){
    this.imgSize = string.split(" ");
    this.img.style.width = this.imgSize[0];
    this.img.style.height = this.imgSize[1];
  }

  mode (string){
    this.imgMode = string;
    this.img.style.backgroundSize = this.imgMode;
  }

  pushCache (path){
    const newImageSrc = this.setup.folder + path;
    let found = false;
    for(const image of this.cache){
      const imageSrc = image.attributes.src.nodeValue;
      if(imageSrc === newImageSrc){
        found = true; 
      }
    }
  
    if(!found){
      const img = document.createElement("IMG");
      img.src = newImageSrc;
      this.cache.push(img);
    }
  }

  init (node = document.body){
    node.appendChild(this.node);
  }
}
