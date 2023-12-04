const express = require("express")
const cors = require("cors")
const db = require('./database');

const app = express()

app.use(cors())
app.use(express.json())

const port = 5000

// Test GET function
app.get("/api/hello", async(req,res) => {
    try {
        const message = "hello world"
        res.json(message)
    }
    catch(err) {
        console.error(err.message, "api/hello")
    }
})

// Test POST function
app.post("/api/hello_post", async(req,res) =>{
    try{
        console.log(req.body)
        res.json("post received")
    }
    catch(err){
        console.error(err.message, "/api/hello_post")
    }
})

// Test MySQL connection
// Select all from users
app.get("/api/sql", async (req, res) => {
    try {
        const [rows, fields] = await db.promise().query("SELECT * FROM users");
        console.log(rows);
        // Send the fetched data as the response
        res.status(200).send(rows);
    } catch (err) {
        console.error(err.message, "/api/sql");
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Add data to user table
app.post('/api/sql', async (req, res) => {
    const { email, bio, country } = req.body;
    
    if (email && bio && country) {
        try {
            // Use parameterized query to avoid SQL injection
            const result = await db.promise().query(
                'INSERT INTO users (email, bio, country) VALUES (?, ?, ?)',
                [email, bio, country]
            );

            // Check the result if needed
            console.log(result);

            res.status(201).send({ msg: 'Created User' });
        } catch (err) {
            console.error(err.message, "/api/sql");
            res.status(500).send({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).send({ error: 'Bad Request: email, bio, and country are required.' });
    }
});

// Delete user from users table
app.delete("/api/sql/:userId", async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send({ error: 'Bad Request: User ID is required.' });
    }

    try {
        const result = await db.promise().query("DELETE FROM users WHERE id = ?", [userId]);

        // Check the result if needed
        console.log(result);

        if (result[0].affectedRows > 0) {
            res.status(200).send({ msg: `User with ID ${userId} deleted successfully.` });
        } else {
            res.status(404).send({ error: `User with ID ${userId} not found.` });
        }
    } catch (err) {
        console.error(err.message, "/api/sql");
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


app.listen(port,()=>{
    console.log("Server is starting on port 5000")
})