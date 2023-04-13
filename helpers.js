const fs = require("fs");
const path = require("path");
const utility = require("./utility");
const { log } = require("console");

function organizeHelper(src,dest){
    const childNames = fs.readdirSync(src);

    for(let i = 0; i<childNames.length; i++){
        let childAddress = path.join(src,childNames[i]);
        if(fs.lstatSync(childAddress).isFile()){
            let category = getCategory(childNames[i]);
            sendFiles(childAddress,dest,category);
        }
    }
}
let types = utility.utility.types;
function getCategory(name){
    let ext = path.extname(name).slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        
        for(let i = 0;i<cTypeArray.length; i++){
            if(ext == cTypeArray[i])return type;
        }
    }
    return "others";
    
}

function treeHelper(directoryPath,indent){

    let isFile = fs.lstatSync(directoryPath).isFile();
    if(isFile){
        let fileName = path.basename(directoryPath);
        console.log(indent + "|----🧨" + fileName);
    } else {
        let dirName = path.basename(directoryPath);
        console.log(indent + "|~~~~💕 "+ dirName);
        let children  = fs.readdirSync(directoryPath);
        for(let i = 0; i<children.length; i++){
            let childPath = path.join(directoryPath,children[i]);
            treeHelper(childPath, indent + '\t');
        }
    }
}
function sendFiles(childAddress,dest,category){
    let categoryPath = path.join(dest,category);
    if(!fs.existsSync(categoryPath)){
        fs.mkdirSync(categoryPath);
    }

    let filename = path.basename(childAddress);
    let destFilePath = path.join(categoryPath,filename);
    fs.copyFileSync(childAddress,destFilePath); // copying data from childAddress to destinationAddress
    // fs.unlinkSync(childAddress); //  deletes the original file if you want to
}
module.exports = {organizeHelper,treeHelper};