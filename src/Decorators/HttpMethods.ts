import { RequestHandler } from 'express'
import 'reflect-metadata'
import { Metadatakeys, Methods } from './Method'


interface RouteHandlerDescriptor extends PropertyDescriptor{
    value?:RequestHandler;
}
function routeBinder(method:string){
return function(path:string){
    return function(target:any, propertykey:string|symbol ,descriptor:RouteHandlerDescriptor){
        Reflect.defineMetadata(Metadatakeys.Path, path ,target , propertykey)
        Reflect.defineMetadata(Metadatakeys.Method, method, target,propertykey)
    }
}
} 

export const get = routeBinder(Methods.Get)
export const post = routeBinder(Methods.Post)
export const put = routeBinder(Methods.Put)
export const patch = routeBinder(Methods.Patch)
export const del = routeBinder(Methods.Delete)