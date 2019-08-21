class Table extends Node {
  // dataCollection = Array
  // setup = { caption:string, search:boolean, dynamic:boolean }
  constructor (dataCollection, setup){
    super(["DIV", { style:"display:table" }]);
    
    // If dataCollection is a string(JSON) parse it before appending to the data.
    if(typeof dataCollection === "string"){
      dataCollection = JSON.parse(dataCollection);
    }

    this.data = [dataCollection]; // Table structure
    this.cache = [];
    this.setup = setup ? setup : { dynamic:false, search:false }; // Store all settings
    this.dynamic = this.setup.dynamic // Solution for if(this.setup && this.setup.dynamic);
    this.table = document.createElement("TABLE");
    this.thead = this.table.createTHead().insertRow();
    this.tbody = this.table.createTBody();
    this.tfoot = this.table.createTFoot();
    this.tcaption = this.table.createCaption();
    // Custom
    this.nav = document.createElement("NAV");
    this.index = 0; // The index of loaded data.
    this.searchWrap = document.createElement("SEARCH");
    this.input = document.createElement("INPUT");
    this.button = document.createElement("BUTTON");

    if(this.setup){
      if(this.setup.caption){
        this.caption(this.setup.caption);
      }
      if(this.setup.search){
        this.input.type = "text";
        this.button.textContent = "Search";

        // Search on ENTER key.
        this.input.addEventListener("keyup", (e)=>{
          if(e.key === "Enter"){
            this.search();
          }
        });

        // Search on BUTTON click.
        this.button.onclick = ()=>{
          this.search();
        };

        this.searchWrap.appendChild(this.input);
        this.searchWrap.appendChild(this.button);
        this.node.appendChild(this.searchWrap);
        this.cacheData();
      }
    }
    this.node.appendChild(this.table);
    this.node.appendChild(this.nav);

    this.load(); // Load the first dataCollection from the DATA array.
  }

  search (){
    const keywords = this.input.value.toLowerCase().split(" ").filter(value => value != "");
    const row = this.tbody.childNodes;

    // Check if there are any keywords.
    if(keywords.length){
      const cache = this.cache[this.index];

      // Search for keywords.
      for(let i = 0; i < cache.length; i++){
        const found = [];

        for(const keyword of keywords){
          
          const regex = new RegExp(keyword);
          const result = regex.test(cache[i]);
          if(result){
            found.pushUnique(keyword);
          }
        }

        if(keywords.length === found.length){
          row[i].className = "match";
        }else{
          row[i].className = "nomatch";
        }
      }
    }else{
      // Remove all classes
      let count = row.length;
      while(count--){
        row[count].className = "";
      }
    }
  }

  removeClass (){
    const row = this.tbody.childNodes;

    // Remove all classes
    let count = row.length;
    while(count--){
      row[count].className = "";
    }
  }

  cacheData (){
    const dataCache = [];
    const data = this.data[this.index];
    for(let i = 0; i < data.length; i++){
      const row = data[i];
      const values = Object.values(row);
      let rowCache = "";
      for(const value of values){
        rowCache += value;
      }

      rowCache = rowCache.toLowerCase();
      dataCache.push(rowCache);
    }
    this.cache.push(dataCache);
  }

  clear (node){
    while(node.lastChild){
      node.removeChild(node.lastChild);
    }
  }

  caption (string){
    this.tcaption.textContent = string;
  }

  head (data){
    const keys = Object.keys(data[0]);
    for(const key of keys){
      const cell = document.createElement("TH");
      cell.textContent = key;
      this.thead.appendChild(cell);
    }
  }

  swap (){
    const currentData = this.tbody.childNodes;
    const newData = this.data[this.index];
    const currentLength = currentData.length;
    const newLength = newData.length;
    
    if(newLength < currentLength){
      let delCount = currentLength - newLength;
      while(delCount--){
        this.tbody.removeChild(this.tbody.lastChild);
      }
    }else{
      let rowCount = newLength - currentLength;
      let cellCount = currentData[0].childNodes.length;
      
      while(rowCount--){
        const row = this.tbody.insertRow();
        while(cellCount--){
          row.insertCell();
        }
      }
    }

    for(let i = 0; i < newLength; i++){
      const row = currentData[i].childNodes;
      const newValues = Object.values(newData[i]);
      for(let j = 0; j < newValues.length; j++ ){
        row[j].textContent = newValues[j];
      }
    }
  }

  load (){
    // Clear the head and body of the table.
    this.clear(this.thead);
    this.clear(this.tbody);
    // Generate a header using the current selected index.
    this.head(this.data[this.index]);
    // Insert each object to the tbody from the dataCollection.
    for(const obj of this.data[this.index]){
      this.insertRow(obj);
    }
  }

  preload (dataCollection, caption){
    // If dataCollection is a string(JSON) parse it before appending to the data.
    if(typeof dataCollection === "string"){
      dataCollection = JSON.parse(dataCollection);
    }
    
    // If preload() is called for the first time, append the first button for the this.data[0] collection.
    // This if statement will run only once, on the first preload().
    if(this.data.length === 1){
      this.addButton(this.setup.caption);
    }

    // Push the new data to "this.data" and append a button for it.
    this.data.push(dataCollection);
    this.addButton(caption);
    if(this.setup && this.setup.search){
      this.cacheData();
    }
  }

  insertRow (obj){
    const row = this.tbody.insertRow();
    // Loop all values from an object into a row.
    for(const key in obj){
      row.insertCell().textContent = obj[key];
    }
  }

  addButton (caption){
    const button = document.createElement("BUTTON");

    button.value = this.data.length-1;
    if(this.dynamic){
      button.dataset["caption"] = caption;
      button.textContent = caption;
    }else{
      button.textContent = this.data.length;
    }

    button.addEventListener("click", e => {
      this.index = e.target.value;
      if(this.dynamic){
        this.caption(caption);
      }
      
      // Removes all the classes when search is enabled.
      if(this.setup && this.setup.search){
        this.removeClass();
      }

      if(this.data.length > 1){
        this.swap();
      }else{
        this.load();
      }
    });

    this.nav.appendChild(button);
  }
}
