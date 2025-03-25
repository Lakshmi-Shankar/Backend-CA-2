const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const route = require("./routes");

app.use(express.json());

const URI = process.env.URI;
const PORT = process.env.PORT;

mongoose.connect(URI)
.then(()=>{
    console.log("Database connected successfully")
    app.listen(PORT, (req,res)=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
})
.catch((err)=>{
    console.log(`Error -> ${err.message}`)
})

app.use("/api", route);