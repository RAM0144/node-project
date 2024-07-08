import express from "express";


// const teachers = [];

import { teachers } from "./local-memory.js";

const teacherRouter = express.Router();

// Read for the teachers
teacherRouter.get("/", (req, res) => {
    const { studentId } = req.query;
    try {
        if (studentId) {
            const tempTchs = teachers.filter((teacher) => 
                teacher.students.includes(studentId)
        );
         res.send({ msg: "Teacher Info for a student" + studentId,
            teacher: tempTchs[0],

          });
        
    } else {
        res.send({ msg: "Info about all the teachers", teachers })
    }
        
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

// Read info about a individual one student

teacherRouter.get("/:teacherId", (req, res) => {
    const teacherId = req.params.teacherId;

    try {
        const stuData = teachers.find((stu) => stu.id === teacherId);
     if (stuData) {
        res.send({...stuData})
     } else {
        res.status(404).send({ msg: "No Teacher Found" });
     }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});



//Create a single teacher

teacherRouter.post("/", (req, res) => {
    const teacherInfo = {...req.body, id:Date.now().toString(), students: []};
    try {
        teachers.push(teacherInfo);
        res.send({ msg: "Teacher Created Successfully" });
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

// Update a single teacher

teacherRouter.put("/:teacherId", (req, res) => {
    const teacherInfo = req.body;
    const teacherId = req.params.teacherId;
    

    try {
        const index = teachers.findIndex((teach) => teach.id === teacherId);
        const teachObj = teachers.find((teach) => teach.id === teacherId);
        if (teachObj) {
           teachers[index] = {
            ...teachObj,
            ...teacherInfo,
           }
           res.send({ msg: "Teacher Created Successfully" })
        } else {
            res.status(404).send({ msg: "No Teacher Found" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});


// Delete a single teacher

teacherRouter.delete("/:teacherId", (req, res) => {
    const teacherId = req.params.teacherId;

    try {
        const index = teachers.findIndex((teach) => teach.id === teacherId);
        if (index !== -1) {
           teachers.splice(index , 1);
           res.send({ msg: "Teacher Deleted Successfully" });
        } else {
            res.status(404).send({ msg: "No Teacher Found" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

export default teacherRouter;
