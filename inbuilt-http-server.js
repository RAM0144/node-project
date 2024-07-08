
import { createServer } from "http";

const students = [];

const server = createServer((req, res) => {
    // res.end("<h1>Hello Ram!!</h1>");
    // res.end(JSON.stringify({message: "Hello Ram!"}))

    if(req.method === "GET") {
       if( req.url === "/users" ) {
        res.end(JSON.stringify({ message : "Users Data" ,users: [{ name: "Ram" }, { name: "Varsha" }] }));
       } else {
        res.end(JSON.stringify({message: "Hello VarshaRam!!"}));
       }     
    } else if( req.method === "POST") {
        res.end(JSON.stringify({ message : "Data Craeated successfully" }));
    }
    
});

const port = 5500;

server.listen(port, () => {
    console.log("Server listening on port" + port);
});




 














// const students = [];

// const server = createServer((req, res) => {
//     // res.end("<h1>Hello Ram!!</h1>");
//     res.end(JSON.stringify({ message : "Hello VarshaRam!!" }));
// });

// const port = 5500;

// server.listen(port, () => {
//     console.log("Server listening on port" + port);
// });