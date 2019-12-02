// implement your API here
const express = require("express");
const cors = require("cors");
//import database 
const db = require("./data/db");

const port = 5000;

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// GET all users
server.get("/api/users", (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved.", err });
    })
})

// GET a specific user by id
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retreived", err });
    })
})

// POST a new user
server.post("/api/users", (req, res) => {
    const userData = req.body;
    if (userData.name && userData.bio) {
        db.insert(userData)
            .then(user => {
                res.status(201).json({ message: "user created successfully", userData });
            })
            .catch(err => {
                res.status(500).json({ message: "server error", err });
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
})

// DELETE user by id
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: "User removed successfully", removed });
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });   
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed", err });
    })
})

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    if (updatedData.name && updatedData.bio) {
        db.update(id, updatedData)
            .then(updated => {
                if (updated) {
                    res.status(200).json({ message: "user updated successfully", updatedData });
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist" });
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The user information could not be modified", err });
        })   
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user" });
    }
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
