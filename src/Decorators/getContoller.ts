import 'reflect-metadata'
import { Metadatakeys, Methods } from './Method'
function routeBinder(method:string){
return function(path:string):MethodDecorator{
    return function(target:any, propertykey:string|symbol ,descriptor:PropertyDescriptor){
        Reflect.defineMetadata(Metadatakeys.path, path ,target , propertykey)
        Reflect.defineMetadata(Metadatakeys.method, method, target,propertykey)
    }
}
}

export const get = routeBinder(Methods.get)
export const post = routeBinder(Methods.post)
export const put = routeBinder(Methods.put)
export const patch = routeBinder(Methods.patch)
export const del = routeBinder(Methods.delete)