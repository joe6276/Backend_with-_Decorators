
import 'reflect-metadata'
import { Metadatakeys } from './Method'
export function BodyValidator(...keys:string[]){
    return function (target:Object,propertykey:string, descriptor:PropertyDescriptor){
            Reflect.defineMetadata(Metadatakeys.Validators, keys,target, propertykey)
    }
}