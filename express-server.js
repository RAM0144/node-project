import express from "express";

import  connectToDB  from "./db-utils/mongodb-connection.js";

// import studentsRouter from "./routes/students.js";
// import teacherRouter from "./routes/teachers.js";
import studentsDbRouter from "./routes/students-db.js";
import teachersDbRouter from "./routes/teachers-db.js";


const server = express();

// Body Parsing Middleware ->postman api data view on terminal
server.use(express.json());

// connecting to the DB before sever starts
// Top level await
await connectToDB();


// server.get("/", (req, res) => {

//     res.send({ message: "Hello Ram!" });
// });

// server.get("/users", (req, res) => {
//     res.send({ message: "User Data", users:[{name: "Ram"}, {name: "Varsha"}] })
// });

// server.post("/", (req, res)=> {
//     const body = req.body;
//     console.log("Body Data from request", body)
//     res.send({ message: "Data created successfully" });
// });


// use the router middleware into the server
           // base-path  Router object

// server.use("/students", studentsRouter);

// server.use("/teachers", teacherRouter);

server.use("/students", studentsDbRouter);

server.use("/teachers", teachersDbRouter);

const port = 5500;

server.listen(port, () => {
  console.log( Date().toString(), "listening on port", port)  
})