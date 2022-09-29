import 'reflect-metadata'
import { Metadatakeys, Methods } from './Method'
function routeBinder(method:string){
return function(path:string):MethodDecorator{
    return function(target:any, propertykey:string|symbol ,descriptor:PropertyDescriptor){
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