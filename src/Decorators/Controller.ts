import 'reflect-metadata'
import { Validator } from '../Helpers/Validators'
import { AppRouter } from '../Router/AppRouter'
import { Metadatakeys, Methods } from './Method'
export function Controller(mainpath:string){
    return function (target:Function){
    const router=AppRouter.getInstance()
          const parent=Object.getOwnPropertyNames(target.prototype)
          let [constructor,...keys]=parent
          for (let key of keys){
            const routehandler = target.prototype[key]
            const path= Reflect.getMetadata(Metadatakeys.Path, target.prototype, key)
            const method:Methods= Reflect.getMetadata(Metadatakeys.Method, target.prototype, key)
            const middlewares = Reflect.getMetadata(Metadatakeys.Middleware, target.prototype,key)||[]
            const fields = Reflect.getMetadata(Metadatakeys.Validators,target.prototype , key)||[]

            const validator = Validator(fields)
          if(path &&  method ){
              router[method](`${mainpath}${path}`, middlewares, validator, routehandler)
          }
          }
    }
}