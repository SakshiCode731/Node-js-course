// you have to write a Node.js program to clear clutter inside of a directory and oraganize the contents of that directory into diffrent folders
// for emaple, these files become:

// 1. name.jpg
// 2. name.png
// 3. sakshi.zip
// 3. name.pdf
// rohan.zip
// catch.jpg

// this:
//jpg/name.jpg, jpg/cat.jpg
//png/name.png
//zip/sakshi.zip, zip/rohan.zip
//pdf/name.pdf

import fs from "fs/promises";
import fsn from "fs";
import path from "path";

const basepath = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\Node-js-course\\video91"
let files = await fs.readdir(basepath)
// console.log(files)


for (const item of files) {
    console.log("runnig for items", item)
    let ext = item.split(".")[item.split(".").length - 1]
    // console.log(ext)
    if (ext != "js" && ext != "json" && item.split(".").length > 1)
        if (fsn.existsSync(path.join(basepath, ext))) {

            fs.rename(path.join(basepath, item), path.join(basepath, ext, item))
            //move the file to this directory if its not a js or json file
        }
        else {
            fs.mkdir(ext)
             fs.rename(path.join(basepath, item), path.join(basepath, ext, item))
        }
    // console.log(item)
}