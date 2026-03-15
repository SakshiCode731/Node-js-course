const fs = require("fs")
// console.log(fs)

console.log("starting")
// fs.writeFileSync("sakshi.txt", "sakshi is a good girl")

fs.writeFile("sakshi2.txt","sakshi is a good girl2",()=>{
    console.log("done") // schedule for the further run
    fs.readFile("sakshi2.txt",(err,data)=>{
        console.log(err,data.toString())
    })
})

fs.appendFile("sakshi.txt", "sakshirobo", (e,d)=>{
    console.log(d)
})
console.log("ending")