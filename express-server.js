import express from "express";
import cors from "cors"
import jwt from "jsonwebtoken"
import  connectToDB  from "./db-utils/mongodb-connection.js";
import connectViaMongoose from "./db-utils/mongoose-connection.js";

// import studentsRouter from "./routes/students.js";
// import teacherRouter from "./routes/teachers.js";
import studentsDbRouter from "./routes/students-db.js";
import teachersDbRouter from "./routes/teachers-db.js";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";



const server = express();

// Body Parsing Middleware ->postman api data view on terminal
server.use(express.json());

//third party middleware
server.use(cors()); // using the cors middleware to make our apis CORS complaint

dotenv.config();

//* Custom Middleware
const logger = (req, res, next) => {
  console.log(new Date().toString(), req.url, req.method);
  next();
};

const authAPI = (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    if (Boolean(token)) {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).send({ msg: "Unauthorized" });
  }
};

const authWithRole = (role) => (req, res, next) => {
  const token = req.headers["authorization"];
    // we should also ensure role is teacher

    // get the payload/data from the token
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      
      if (data.role === role) {
        next();
      } else {
        res.status(401).send({ msg: "Unauthorized" });
      }
    
    } catch (error) {
      res.status(401).send({ msg: "Unauthorized" });
    }
}

// using the custom middleware
server.use(logger);


// connecting to the DB before sever starts
// Top level await
await connectToDB();

// Mongoose connection

await connectViaMongoose();


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



server.use("/students", authAPI, studentsDbRouter);

server.use("/teachers", authWithRole("teacher"), teachersDbRouter);

server.use("/auth" , authRouter);


const port = 5500;

server.listen(port, () => {
  console.log( Date().toString(), "listening on port", port)  
})