import express from "express";
const userRoute = express.Router();

userRoute.get('/', (req,res) => 
{
    console.log('object');
})

export default userRoute;