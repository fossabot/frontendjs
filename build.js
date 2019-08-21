console.log("\x1b[33m%s\x1b[0m", "Building...");

const fs = require("fs");

// Variables
const outFile = "frontend.js";
const outFolder = "./out/";
const outPath = outFolder + outFile;
const srcFolder = "./src/";

// Create out folder (outFolder).
if(!fs.existsSync(outFolder)){
    fs.mkdirSync(outFolder);
}else if(fs.existsSync(outPath)){
    fs.unlinkSync(outPath);
}

// Read the src folder
//const srcFiles = fs.readdirSync(srcFolder);
const srcFiles = ["array.prototype", "ajax", "createElement", "Node", "Element", "Slideshow", "Table"];

// Use strict
fs.appendFileSync(outPath, "\"use strict\";" + "\r\n");

// Add all files together and output a frontend.js file
for(const file of srcFiles){
    console.log(srcFolder + file + ".js");
    const data = fs.readFileSync(srcFolder + file + ".js", "utf8");
    fs.appendFileSync(outPath, data + "\r\n");
}

console.log("\x1b[32m%s\x1b[0m", "\r\n Building finished");