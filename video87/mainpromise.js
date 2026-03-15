import fs from "fs/promises"
let a = await fs.readFile("sakshi.txt")

let b= await fs.appendFile("sakshi.txt", "\n\n\n\nthis is amazing promise")
console.log(a.toString(),b)

