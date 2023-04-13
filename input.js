#!/usr/bin/env node
let inputArr = process.argv.slice(2); // pehle do toh argv array mei "node filename.js" hota hai 
// console.log(inputArr);
// # Todo
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");



const command = inputArr[0];
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1])
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please 🤦‍♀️ input correct command");
        break;
}

function treeFn(directoryPath){
    let destinationPath;
    let indent = "";
    if(directoryPath === undefined){
        helpers.treeHelper(process.cwd(),"")
        return;
    } else {
        if(fs.existsSync(directoryPath)){
            destinationPath = path.join(directoryPath,"organized_files");
            if(!fs.existsSync(destinationPath)){
                fs.mkdirSync(destinationPath);
            }
            
        }else{
            console.log("NOT A VALID PATH");
            return;
        }
    }
    helpers.treeHelper(directoryPath,indent);
}
function organizeFn(directoryPath){
    // input -> directory path is given 
    // create -> organized_files directory
    // check extension of all files and identify their type;
    // copy / cut files to that organized directories.
    let destinationPath;
    if(directoryPath === undefined){
        destinationPath = process.cwd();
        return;
    } else {
        if(fs.existsSync(directoryPath)){
            destinationPath = path.join(directoryPath,"organized_files");
            if(!fs.existsSync(destinationPath)){
                fs.mkdirSync(destinationPath);
            }
            
        }else{
            console.log("NOT A VALID PATH");
            return;
        }
    }
    helpers.organizeHelper(directoryPath,destinationPath);
}
function helpFn(){
    console.log(`List of all the commands:
                 node main.js tree "directoryPath"
                 node main.js organize "directoryPath"
                 node main.js help                
    `);
}

