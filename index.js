const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const port = 5000


app.get("/api/hello", async(req,res) => {
    try {
        const message = "hello world"
        res.json(message)
    }
    catch(err) {
        console.error(err.message, "api/hello")
    }
})

app.post("/api/hello_post", async(req,res) =>{
    try{
        console.log(req.body)
        res.json("post received")
    }
    catch(err){
        console.error(err.message, "/api/hello_post")
    }
})





app.listen(port,()=>{
    console.log("Server is starting on port 5000")
})