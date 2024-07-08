import express from "express";

import { db } from "../db-utils/mongodb-connection.js";

const studentsDbRouter = express.Router();

const collection = db.collection("students")

//Create a new Student
studentsDbRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        
        // await db.collection("students").insertOne({
            await collection.insertOne({
            ...payload,
            id: Date.now().toString(),
            techerId: null,
        });
      res.status(201).send({ msg: "Student Created Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

// Get all the students

studentsDbRouter.get("/", async (req, res) => {
     try {
        const students = await collection.find({}, {projection: {_id: 0}}).toArray();
        
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