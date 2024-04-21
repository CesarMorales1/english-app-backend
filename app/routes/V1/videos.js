import express from "express";

const videoRoute = express.Router();

videoRoute.get('/', (req,res) => 
{
    console.log('object');
})

export default videoRoute;