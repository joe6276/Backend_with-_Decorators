import { RequestHandler } from "express";
import 'reflect-metadata'
import { Metadatakeys } from "./Method";

export function Use(middleware:RequestHandler){
    return function(target:Object, key:string , descriptor:PropertyDescriptor ){
        const middlewares = Reflect.getMetadata(Metadatakeys.middleware, target,key)|| []
        Reflect.defineMetadata(Metadatakeys.middleware, [...middlewares,middleware],target,key)
        
    }
}