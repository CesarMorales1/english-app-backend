import express from "express";
const rolRouter =  express.Router();

rolRouter.get('/',(req,res,next) => 
    {
        console.log('object');
    })

export default rolRouter;