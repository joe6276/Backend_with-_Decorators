import { NextFunction,Response , Request ,RequestHandler } from "express";

 export function Validator (keys:string[]):RequestHandler{
    return function(req:Request, res :Response , next :NextFunction){
        if(!req.body){
           return  res.status(422).send('Invalid Request');  
        }
            for (let key of keys ){
                if(!req.body[key]){
                    return  res.status(422).send('Invalid Request');  
                }
            }

        next()
    }
}