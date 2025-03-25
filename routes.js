const express = require("express");
const app = express();
const Movie = require("./schema");

const route = express.Router();

route.get("/get", async(req,res)=>{
    try{
        const allData = await Movie.find();
        if(allData.length === 0){
            res.status(404).json({
                Message: "Invalid movie or User ID"
            })
        }

        res.status(200).json({
            Message: "All Data",
            AllMovies: allData
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Internal server error",
            Error: err.message
        })
    }
});

route.get("/get/:id", async(req, res)=>{
    try{
        const ID = req.params.id;
        const dataById = await Movie.findById({ _id:ID });
        if(!dataById){
            res.status(404).json({
                Message: "Invalid movie or User Id"
            })
        }
        res.status(200).json({
            DataByID: dataById
        })
    }
    catch(err){
        res.status(500).json({
            Message: 'Internal server error',
            Error: err.message
        })
    }
})

route.post("/post", async(req,res)=>{
    try{
        const { title,director,genre,releaseYear,avaliableCopies } = req.body;
        if(!title || !director || !genre || !releaseYear || !avaliableCopies){
            res.status(400).json({
                Message: "All fields are required",
                dat: req.body
            })
        }

        const newMovie = new Movie({
            title:title,
            director:director,
            genre:genre,
            releaseYear:releaseYear,
            availableCopies:avaliableCopies
        })
        await newMovie.save();
        res.status(201).json({
            Message: "New movie created",
            NewMovie: newMovie
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Internal server error"
        })
    }
});

route.put("/put/:id", async(req, res)=>{
    try{
        const ID = req.params.id;
        if(!ID){
            res.status(404).json({
                Message: "Invalid user ID"
            })
        }
        const updatedData = await Movie.findByIdAndUpdate(ID,req.body,{new:true});
        res.status(201).json({
            Message: "Updated",
            AfterUpdation: updatedData
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Internal server error",
            Error: err.message
        })
    }
});

route.delete("/delete/:id", async(req, res) => {
    try{
        const ID = req.params.id;
        if(!ID){
            res.status(404).json({
                Message: "Invalid user id"
            })
        }
        await Movie.findByIdAndDelete(ID);
        res.status(200).json({
            Message: "Deleted the data"
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Internal server error",
            Error: err.message
        })
    }
})

module.exports = route;