import express from "express";
const userRoute = express.Router();

userRoute.put('/:id',(req,res,next ) => 
    {
        console.log(req.params.id);
    })


export default userRoute;