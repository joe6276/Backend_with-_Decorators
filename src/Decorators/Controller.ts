import 'reflect-metadata'
import { AppRouter } from '../Router/AppRouter'
import { Metadatakeys, Methods } from './Method'
export function Controller(mainpath:string){
    return function (target:Function){
    const router=AppRouter.getInstance()
          const parent=Object.getOwnPropertyNames(target.prototype)
          let [constructor,...keys]=parent
          for (let key of keys){
            const routehandler = target.prototype[key]
            const path= Reflect.getMetadata(Metadatakeys.path, target.prototype, key)
            const method:Methods= Reflect.getMetadata(Metadatakeys.method, target.prototype, key)
            const middlewares = Reflect.getMetadata(Metadatakeys.middleware, target.prototype,key)||[]
          if(path &&  method ){
              router[method](`${mainpath}${path}`, middlewares, routehandler)
          }
          }
    }
}