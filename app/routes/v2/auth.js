import express from "express";
import validationWithPassport from "../../helpers/handlerJwtPassport.js";
const authRouter = express.Router();


authRouter.get('/',async (req,res,next) => 
{
    
});

export default authRouter;


