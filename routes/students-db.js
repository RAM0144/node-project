import express from "express";

import { db } from "../db-utils/mongodb-connection.js";
import { studentModel } from "../db-utils/models.js";

const studentsDbRouter = express.Router();

const collection = db.collection("students")

//Create a new Student->MongoDD Logic

// studentsDbRouter.post("/", async (req, res) => {
//     try {
//         const payload = req.body;
//         // MongoDB logic (without object modelling - No Payload Validation)
//         // await db.collection("students").insertOne({
//             await collection.insertOne({
//             ...payload,
//             id: Date.now().toString(),
//             techerId: null,
//         });
//       res.status(201).send({ msg: "Student Created Successfully" })

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ msg: "Internal Server Error" });
//     }
// });

// // Create a new student->Mongoose Logic

studentsDbRouter.post("/", async (req, res) => {
    try {
      const payload = req.body;
      // Mongoose Logic ( with Object Modelling means payload validation )
      const student = new studentModel({
        ...payload,
        id: Date.now().toString(),
        teacherId: null,
      });
  
      try {
        await student.save(); // validate and insert the student into the database
        // for only validation we can use student.validate() instead
  
        res.status(201).send({ msg: "Student Created Successfully" });
      } catch (e) {
        console.log(e);
        res.status(400).send({ msg: "Please enter all the fields for Student" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  });

// // Get all the students

studentsDbRouter.get("/", async (req, res) => {
     try {
      // MongoDB
      //  const students = await collection.find({}, {projection: {_id: 0}}).toArray();
      
      // Mongoose
          const students = await studentModel.find({}, {_id: 0});  
        res.send({ msg: "Info about all the students", students });
     } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
     }
});

// Get a single students

studentsDbRouter.get("/:studentId", async (req, res) => {
            
        try {
            const studentId = req.params.studentId;
            const  student = await collection.findOne({id: studentId},{projection:{_id: 0}});             
            res.send({ msg: "Info about all the students" + studentId, student });

        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Internal Server Error" });
        }
});



// Update a single student

studentsDbRouter.put("/:studentId", async (req, res) => {

        try {
            const studentId = req.params.studentId;
            const payload = req.body;
            
            await collection.updateOne(
                {
                    id: studentId,
                },
                {
                    $set: payload,
                }
            );
            res.send({ msg: "Student Updated Successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Internal Server Error" });
            
        }
});

// Delete a single student

studentsDbRouter.delete("/:studentId", async  (req, res) => {
    try {
        const studentId = req.params.studentId;
        
        await collection.deleteOne(
            {
              id: studentId,
            }
        );
        res.send({ msg: "Student Deleted Successfully" }); 
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

export default studentsDbRouter;