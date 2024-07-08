import express from "express";

import { db } from "../db-utils/mongodb-connection.js";

const teachersDbRouter = express.Router();

const collection = db.collection("teachers");

// Create a new teacher

teachersDbRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;

        await collection.insertOne({
            ...payload,
            id: Date.now().toString(),
            studentId: null,
        });

        res.status(201).send({ msg: "Teacher Created Successfully!" });

    } catch (error) {
        console.log(error);

        res.status(500).send({ msg: "Internal Server Error" });
    }
});

// Get all the Students

teachersDbRouter.get("/", async (req, res) => {
    try {
        const teachers = await collection.find({}, { projection: { _id: 0 } }).toArray();

        res.send({ msg: "Info about all the teachers", teachers });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

teachersDbRouter.get("/:teacherId", async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teachers = await collection.findOne({ id: teacherId }, { projection: { _id: 0 } });

        res.send({ msg: "Info about all the teachers" + teacherId, teachers });
    } catch (error) {
        console.log(error);

        res.status(500).send({ msg: "Internal Server Error" });
    }
});

// Update a single teacher
teachersDbRouter.put("/:teacherId", async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const updateInfo = req.body;
        await collection.updateOne(

            {
                id: teacherId,
            },

            {
                $set: updateInfo,
            },

        );

        res.send({ msg: "Teacher Updated Successfully!" });

    } catch (error) {
        console.log(error);

        res.status(500).send({ msg: "Internal Server Error" })
    }
});

// Delete a single teacher

teachersDbRouter.delete("/:teacherId", async (req, res) => {
    try {
        const teacherId = req.params.teacherId;

        await collection.deleteOne(
            {
                id: teacherId,
            },
        );

        res.send({ msg: "Teacher Deleted Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" })
    }
});

export default teachersDbRouter;