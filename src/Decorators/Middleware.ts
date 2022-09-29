import { RequestHandler } from "express";
import 'reflect-metadata'
import { Metadatakeys } from "./Method";

export function Use(middleware:RequestHandler){
    return function(target:Object, key:string , descriptor:PropertyDescriptor ){
        const middlewares = Reflect.getMetadata(Metadatakeys.Middleware, target,key)|| []
        Reflect.defineMetadata(Metadatakeys.Middleware, [...middlewares,middleware],target,key)
        
    }
}