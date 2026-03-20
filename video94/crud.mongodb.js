// //Create
// use("CrudDb")
// db.createCollection("Courses")
// db.Courses.insertOne({
//     name: "Sakshi web dev",
//     price: 0,
//     assignments:12,
//     projects:45
// })

// db.Courses.insertMany([
//     {
//         name: "React Mastery",
//         price: 0,
//         assignments: 15,
//         projects: 30
//     },
//     {
//         name: "Node.js Backend",
//         price: 0,
//         assignments: 10,
//         projects: 25
//     },
//     {
//         name: "Full Stack Bootcamp",
//         price: 0,
//         assignments: 20,
//         projects: 50
//     },
//     {
//         name: "Python for Beginners",
//         price: 0,
//         assignments: 8,
//         projects: 18
//     },
//     {
//         name: "Data Structures in JS",
//         price: 0,
//         assignments: 14,
//         projects: 22
//     },
//     {
//         name: "MongoDB Essentials",
//         price: 900,
//         assignments: 9,
//         projects: 20
//     },
//     {
//         name: "DevOps Basics",
//         price: 1800,
//         assignments: 12,
//         projects: 28
//     }
// ])

// //Read
// // let a = db.Courses.find({price:0})
// // console.log(a.count())
// // console.log(a.toArray())

// let b = db.Courses.findOne({price:0})
// console.log(b)

// //Update

db.courses.updateOne({price:0},{$set:{price:100}})

db.courses.updateMany({price:0},{$set:{price:100}})

//Delete
db.courses.deleteMany({price:100})
