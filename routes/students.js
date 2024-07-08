// APIs for CRUD operation specific to students object

import express from "express";

import { students,teachers } from "./local-memory.js";

//in-memory array for storing the students data
// const students = [];

//Router for the students
const studentsRouter =  express.Router(); // sample instance of the server

//Read all the students
studentsRouter.get("/", (req, res) => {

   try {
    res.send({ msg: "INFO about all the students", students })
   } catch (error) {
    res.status(500).send({ msg: "Internal server error" })
   }
})


//Read info about a individual one student
studentsRouter.get("/:studentId", (req, res) => {
  const studentId = req.params.studentId; 

  try {
     const stuData = students.find((stu) => stu.id === studentId);
   //   res.send({...stuData});
      if (stuData) {
         res.send({ ...stuData });
      } else {
         res.status(404).send({ msg: "No Student Found" });
      }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
});


//Create a new student
studentsRouter.post("/", (req, res) => {
   const studentInfo = {...req.body, id: Date.now().toString(), teacherId: null };
   try {
    students.push(studentInfo);
    res.send({ msg: "students created successfully"})
   } catch (error) {
    res.status(500).send({msg: "Internal server error"})
   }
})


//Update a single student
//use this api for assigning a teacher or changing info of the student
studentsRouter.put("/:studentsId", (req, res) => {
   const UpdateInfo = req.body;
   const studentId = req.params.studentsId;
   try {
      const index = students.findIndex((stu) => stu.id === studentId);
      const stuObj = students.find((stu) => stu.id === studentId);
      
      if (stuObj) {
         students[index] = {
            ...stuObj,
            ...UpdateInfo,
         };

         // check the payload/body for teacherId
         if (UpdateInfo["teacherId"]) {
            const index = teachers.findIndex(
              (t) => t.id === UpdateInfo["teacherId"]);
    
            teachers[index] = {
              ...teachers[index],
              students: [...teachers[index].students,studentId],
            };
          }
         res.send({ msg: "Student Updated Successfully" })
      } else {
         res.status(404).send({ msg: "No Student Found" });
      }
     
   } catch (error) {
      res.status(500).send({msg: "Internal server error"}); 
   }
})

//Delete a single student
studentsRouter.delete("/:studentId", (req, res) => {
  const studentId = req.params.studentId;
   try {
       // Logic to delete a single student
      const index = students.findIndex((stu)=> stu.id === studentId);
      // const stuObj = students.find((stu) => stu.id === studentId);
      
      if (index !== -1) {
         students.splice(index, 1);
         res.send({ msg: "Student Deleted Successfully" });
      } else {
         res.status(404).send({ msg: "No Student Found" });
      }
   } catch (error) {
      res.status(500).send({ msg: "Internal server error" })
   }
})

export default studentsRouter;